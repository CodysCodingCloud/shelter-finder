import React from 'react';
import { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
export default function SideBar() {
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          console.log(result);
          if (result.state === 'granted') {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                console.log(pos);
                const crd = pos.coords;
                console.log('Your current position is:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
              },
              (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
              }
            );
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition((result) =>
              console.log(result)
            );
          } else if (result.state === 'denied') {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert('Sorry Not available!');
    }
  }, []);
  const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_API,
    version: 'quarterly',
  });
  console.log('222', loader);
  return (
    <div className="col-4">
      <h3>Shelters Near You</h3>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia culpa
      eum, nihil dolorum illum asperiores consequatur at ipsa ea reiciendis,
      nisi saepe provident, accusantium laboriosam reprehenderit dolores
      inventore iste atque.
    </div>
  );
}
