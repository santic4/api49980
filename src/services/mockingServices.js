import { faker } from "@faker-js/faker";

function generateOneUser(i) {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    code: `M${i + 1}`,
    price: faker.commerce.price({ min: 1, max: 5000 }),
    status: true,
    stock: 10,
    category: faker.commerce.department(),
    thumbnail: faker.image.abstract()
  };
}
  
export function generateUsers(count) {
    try{
      const users = [];

      for (let i = 0; i < count; i++) {
        users.push(generateOneUser());
        console.log(users)
      }

      return users;

    }catch(err){
      throw new Error('error mocking products', err.message)
    }
}
