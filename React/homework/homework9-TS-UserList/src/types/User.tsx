export type User = {
    id: number
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: "929983874",
      geo: {
        lat: string,
        lng: string,
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string,
    }
}