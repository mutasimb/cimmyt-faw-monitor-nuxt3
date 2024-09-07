import bcryptjs from 'bcryptjs'
import { generate } from "generate-password"

export default phone => new Promise((resolve, reject) => {
  const password = generate({
    length: 5,
    excludeSimilarCharacters: true,
    uppercase: false
  }) + `${phone}`.slice(`${phone}`.length - 3);

  bcryptjs.genSalt(10)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashed => resolve({ password, hashedPassword: hashed }))
    .catch(err => { reject(err) });
})
