import { Vector3 } from "three";

export const rooms = {};

(await fetch('TextFiles/theRoomData1.txt')).text().then((result) => {
  const roomsStrings = result.split('\n');
  roomsStrings.forEach((element) => {
    const room = element.split(',');
    rooms[room[0]] = {
      floor: room[1],
      position: new Vector3(room[2], room[3], room[4]),
    };
  });
});
