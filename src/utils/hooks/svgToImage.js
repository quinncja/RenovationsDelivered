const svgToImage = (svgElement, scaleFactor = 2 ) => {
    let svgData = new XMLSerializer().serializeToString(svgElement);

    const fontStyles = `
      <style>
        text {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        }
      </style>
    `;
    
    svgData = svgData.replace('<svg', `<svg xmlns="http://www.w3.org/2000/svg">${fontStyles} `);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
  
    const rect = svgElement.getBoundingClientRect();
    const width = rect.width * scaleFactor;
    const height = rect.height * scaleFactor;
  
    const viewBoxAttr = `viewBox="0 0 ${width} ${height}"`;

    svgData = svgData.replace(
      '<svg',
      `<svg width="${width}px" height="${height}px" ${viewBoxAttr} xmlns="http://www.w3.org/2000/svg">`
    );

    canvas.width = width;
    canvas.height = height;
  
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
  
    return new Promise((resolve) => {
      img.onload = function () {
        context.scale(scaleFactor, scaleFactor);
        context.drawImage(img, 0, 0);
  
        URL.revokeObjectURL(url);
  
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };
  
      img.onerror = function () {
        URL.revokeObjectURL(url);
        console.error('Error loading SVG image for conversion.');
        resolve(null); 
      };
  
      img.src = url;
    });
  };
  
  export default svgToImage;
  