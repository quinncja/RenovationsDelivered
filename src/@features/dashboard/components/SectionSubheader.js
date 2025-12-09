const SectionSubheading = ({ children, style = {} }) => {
  return (
    <h3
      className="widget-title"
      style={{
        textAlign: "left",
        paddingTop: "20px",
        opacity: ".95",
        fontSize: "16px",
        fontWeight: "500",
        ...style,
      }}
    >
      {children}
    </h3>
  );
};

export default SectionSubheading;
