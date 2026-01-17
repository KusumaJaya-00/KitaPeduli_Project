export const state = {
  users: [
    {
      id: 1,
      name: "Admin Charity",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      name: "Donatur Baik",
      email: "user@gmail.com",
      password: "user123",
      role: "user",
    },
  ],
  currentUser: null,
  kampanye: [
    {
      id: 1,
      title: "Bantuan Pangan Pelosok",
      target: 50000000,
      collected: 15000000,
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500",
    },
    {
      id: 2,
      title: "Pendidikan Anak Yatim",
      target: 20000000,
      collected: 8000000,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500",
    },
  ],
  donasi: [],
  relawan: [],
};
