let formData = new FormData();
let data = {
  title: "title",
  text: "text",
  preview: {
    p_title: "p title",
    p_text: "p text",
  },
};
for (let dataKey in data) {
  if (dataKey === "preview") {
    // append nested object
    for (let previewKey in data[dataKey]) {
      formData.append(`preview[${previewKey}]`, data[dataKey][previewKey]);
    }
  } else {
    formData.append(dataKey, data[dataKey]);
  }
}


