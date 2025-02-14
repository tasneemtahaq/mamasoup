/* eslint-disable @typescript-eslint/no-explicit-any */
const menuschema = {
    name: "menuDish",
    title: "Menu Dish",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Dish Name",
        type: "string",
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: "price",
        title: "Price",
        type: "number",
        validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
      },
      {
        name: "image",
        title: "Dish Image",
        type: "image",
        options: { hotspot: true },
      },
     
      {
        name: "options",
        title: "Options",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "label", title: "Option Label", type: "string" },
              { name: "price", title: "Price", type: "number" },
            ],
          },
        ],
      },
      {
        name: "category",
        title: "Category",
        type: "string",
        options: {
          list: [
            { title: "Main Menu", value: "mainMenu" },
            { title: "Flavoured Fries", value: "fries" },
            { title: "Street Plates", value: "streetplate" },
          ],
        },
      },
    ],
  };
  export default menuschema