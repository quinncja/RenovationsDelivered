import { useEffect, useState } from "react";
import { changeUserRole, fetchUserList } from "utils/api";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import User from "./User";
import { toast } from "sonner";

export function Users() {
  const [items, setItems] = useState({
    adminUsers: [],
    normalUsers: [],
  });
  const [activeId, setActiveId] = useState(null);
  const [hoveredContainer, setHoveredContainer] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUserList();
        const sortedUsers = userData.results.sort(
          (a, b) => new Date(b.lastActiveAt) - new Date(a.lastActiveAt),
        );
        const admins = sortedUsers.filter((user) => hasAdmin(user));
        const normals = sortedUsers.filter((user) => !hasAdmin(user));

        setItems({
          adminUsers: admins,
          normalUsers: normals,
        });
      } catch {
        setItems({
          adminUsers: -10,
          normalUsers: -10,
        });
        toast.error("Failed to load user data");
      }
    };

    loadUsers();
  }, []);

  function findUserById(id) {
    return (
      items.adminUsers.find((user) => user.userId === id) ||
      items.normalUsers.find((user) => user.userId === id)
    );
  }

  const hasAdmin = (user) => {
    return user.authorization.xbpwwqmn.roles.includes("admin");
  };

  function findContainer(id) {
    if (items.adminUsers.find((user) => user.userId === id)) {
      return "adminUsers";
    }
    if (items.normalUsers.find((user) => user.userId === id)) {
      return "normalUsers";
    }
    return null;
  }

  function handleDragOver(event) {
    const { over } = event;
    if (over) {
      const containerId = findContainer(over.id);
      if (containerId) {
        setHoveredContainer(containerId);
      } else if (over.id === "adminUsers" || over.id === "normalUsers") {
        setHoveredContainer(over.id);
      } else {
        setHoveredContainer(null);
      }
    } else {
      setHoveredContainer(null);
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    setActiveId(null);
    setHoveredContainer(null);

    if (!over) {
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer =
      findContainer(over.id) ||
      (over.id === "adminUsers" || over.id === "normalUsers" ? over.id : null);

    if (!activeContainer || !overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeUser = findUserById(active.id);
      if (!activeUser) return;

      const originalContainer = activeContainer;
      const originalRoles = [...activeUser.authorization.xbpwwqmn.roles];
      const newRole = overContainer === "adminUsers" ? "admin" : "member";

      setItems((prevItems) => {
        const updatedOriginal = prevItems[originalContainer].filter(
          (user) => user.userId !== active.id,
        );
        const updatedNew = sortUsersByLastActive([
          ...prevItems[overContainer],
          activeUser,
        ]);

        return {
          ...prevItems,
          [originalContainer]: updatedOriginal,
          [overContainer]: updatedNew,
        };
      });

      changeRole(
        active.id,
        newRole,
        originalContainer,
        originalRoles,
        activeUser,
      );
    } else {
      setItems((prevItems) => ({
        ...prevItems,
        [activeContainer]: sortUsersByLastActive(prevItems[activeContainer]),
      }));
    }
  }

  function handleDragCancel() {
    setHoveredContainer(null);
    setActiveId(null);
  }

  async function changeRole(
    userId,
    newRole,
    originalContainer,
    originalRoles,
    userMoved,
  ) {
    try {
      const response = await changeUserRole(userId, newRole);
      const updatedRoles = response.data.roles;

      setItems((prevItems) => {
        const targetContainer =
          newRole === "admin" ? "adminUsers" : "normalUsers";
        const updatedUsers = prevItems[targetContainer].map((user) =>
          user.userId === userId
            ? {
                ...user,
                authorization: {
                  ...user.authorization,
                  xbpwwqmn: {
                    ...user.authorization.xbpwwqmn,
                    roles: updatedRoles,
                  },
                },
              }
            : user,
        );

        return {
          ...prevItems,
          [targetContainer]: sortUsersByLastActive(updatedUsers),
        };
      });
    } catch (error) {
      console.error("Error changing user role:", error);

      setItems((prevItems) => {
        const targetContainer =
          newRole === "admin" ? "adminUsers" : "normalUsers";

        const updatedTarget = prevItems[targetContainer].filter(
          (user) => user.userId !== userId,
        );

        const restoredUser = {
          ...userMoved,
          authorization: {
            ...userMoved.authorization,
            xbpwwqmn: {
              ...userMoved.authorization.xbpwwqmn,
              roles: originalRoles,
            },
          },
        };

        const updatedOriginal = sortUsersByLastActive([
          ...prevItems[originalContainer],
          restoredUser,
        ]);

        return {
          ...prevItems,
          [targetContainer]: updatedTarget,
          [originalContainer]: updatedOriginal,
        };
      });
    }
  }

  function sortUsersByLastActive(users) {
    return [...users].sort(
      (a, b) => new Date(b.lastActiveAt) - new Date(a.lastActiveAt),
    );
  }

  if (items.adminUsers === -10 && items.normalUsers === -10)
    return (
      <div className="dashboard-welcome user-page">
        <h1> Users </h1>
      </div>
    );

  if (items.adminUsers.length === 0 && items.normalUsers.length === 0) {
    return (
      <div className="dashboard-welcome">
        <h1> Users </h1>
        <div className="loading-widget" />
      </div>
    );
  }

  return (
    <div className="dashboard-welcome user-page">
      <h1> Users </h1>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="user-lists">
          {Object.keys(items).map((containerId) => (
            <div
              key={containerId}
              className={`user-list ${containerId} ${
                hoveredContainer === containerId ? "hovered-container" : ""
              }`}
            >
              <h2>{containerId === "adminUsers" ? "Admins" : "PMs"}</h2>
              <SortableContext
                id={containerId}
                items={items[containerId].map((user) => user.userId)}
                strategy={verticalListSortingStrategy}
              >
                {items[containerId].map((user) => (
                  <SortableUser key={user.userId} user={user} />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeId ? <User user={findUserById(activeId)} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function SortableUser(props) {
  const { user } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: user.userId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      key={user.userId}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <User user={user} />
    </div>
  );
}

export default Users;
