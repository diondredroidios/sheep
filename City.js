export class City {
  // constructor(id, name) {
  //   this.id = id;

  //   if (name) {
  //     this.name = name;
  //   } else {
  //     this.name = City.allCities.filter(cityItem => cityItem.id === id)[0].name;
  //   }
  // }

  static allCities = [
    { id: 4460243, name: "Charlotte" },
    { id: 993800, name: "Johannesburg" },
    { id: 5368361, name: "LA" },
    { id: 2643743, name: "London" },
    { id: 5128581, name: "NYC" },
    { id: 1850147, name: "Tokyo" },
  ];
}
