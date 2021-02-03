export type User = {
  email: string,
  password: string,
};

export function getUsers(): User[]{
  return [
    {email: "asd@asd.asd", password: "123123"},
    {email: "asd1@asd.asd", password: "123123"},
  ];
}

