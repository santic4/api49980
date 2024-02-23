import { faker } from "@faker-js/faker";

function generateOneUser() {
    return {
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      code: `M${index + 1}`,
      price: faker.commerce.price({ min: 1, max: 5000 }),
      status: true,
      stock: 10,
      category: faker.commerce.department(),
      thumbnail: faker.image.abstract()
    };
};
  
export function generateUsers(count) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(generateOneUser());
    }
    return users;
}
