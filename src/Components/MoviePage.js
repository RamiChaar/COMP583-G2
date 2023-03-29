import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';
  
const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
  }
};

const MoviePage = () => {
  const [movieData, setMovieData] = useState([])
  const [movie, setMovie] = useState([])

  const location = useLocation();
  let movieState = location.state;

  async function fetchMovie(movieId) {
    let fetchMovieURL = `https://flixster.p.rapidapi.com/movies/detail?emsVersionId=${movieId}`;
    console.log("fetching movie... " + fetchMovieURL)
    const response = await fetch(fetchMovieURL, fetchOptions).catch(err => console.error(err));
    const json = await response.json();
    return json.data.movie;
  }

  async function createMovieObject() {
    let newMovieData = await fetchMovie(movieState.id);
    setMovieData(newMovieData);
  }

  useEffect(() => {
    let newMovie = {}

    setMovie(newMovie);
  }, [movieData])

  useEffect(() => {
    createMovieObject();
  }, [])


  return (
    <div>
      <h1>{movieState.id}</h1>
    </div>
  );
};
  
export default MoviePage;

// {
//   "emsId": "fde71436-f4ed-323f-b23d-6e0ce470d4ba",
//   "fandangoId": "228578",
//   "rtMovieId": "771516238",
//   "name": "John Wick: Chapter 4",
//   "durationMinutes": 169,
//   "synopsis": "John Wick (Keanu Reeves) uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
//   "directedBy": "Chad Stahelski",
//   "releaseDate": "2023-03-24",
//   "showReleaseDate": "2023-03-24",
//   "dvdReleaseDate": null,
//   "availabilityWindow": "In Theaters",
//   "ovdReleaseDate": null,
//   "totalGross": "73817952",
//   "trailer": {
//       "url": "http://link.theplatform.com/s/NGweTC/media/rJEsfOcpmvMx",
//       "freewheelId": "fandango_2173002307606",
//       "duration": "90.007"
//   },
//   "posterImage": {
//       "url": "https://resizing.flixster.com/IaXbRF4gIPh9jireK_4VCPNfdKc=/489x0/v2/https://resizing.flixster.com/ayiSi8HrUS3_i-Jkru1P2oMM58Q=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhiODAwYWIyLTM1MmItNGI1ZS1iOWQzLTdjZjAzMzI1MDc2Yy5qcGc=",
//       "type": null,
//       "width": null,
//       "height": null
//   },
//   "backgroundImage": {
//       "url": "https://flxt.tmsimg.com/assets/p17843098_i_h10_ac.jpg",
//       "type": "image/jpg",
//       "width": 1920,
//       "height": 1080
//   },
//   "userRating": {
//       "dtlLikedScore": 95,
//       "dtlWtsScore": null,
//       "ratingCount": null,
//       "iconImage": {
//           "url": "https://images.fandango.com/cms/assets/b2570160-9be3-11eb-954b-43250906bea9--red-popcorn.png"
//       }
//   },
//   "tomatoRating": {
//       "tomatometer": 94,
//       "ratingCount": 276,
//       "consensus": "<em>John Wick: Chapter 4</em> piles on more of everything -- and suggests that when it comes to a well-dressed Keanu Reeves dispatching his enemies in lethally balletic style, there can never be too much.",
//       "iconImage": {
//           "url": "https://images.fandango.com/cms/assets/73d962c0-9be3-11eb-8d70-c5bf5e872b28--certifiedfresh-textless.png"
//       },
//       "largeIconImage": {
//           "url": "https://images.fandango.com/cms/assets/823eb040-9be3-11eb-b5d9-dd031ef2e6cb--certifiedfresh.png"
//       }
//   },
//   "genres": [
//       {
//           "id": null,
//           "name": "Action"
//       }
//   ],
//   "images": [
//       {
//           "url": "https://resizing.flixster.com/hvl3CIFQtgLa44OWR-7nhcOepgM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzJmYTU3NjQyLWM0NDktNDllZi1iZjQ4LTFiY2M2OTBmNzRkMy5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/8gvqXbFj4CXF5cTPV5tiy6EV3DA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzMwMjJjMGE5LWQ2OTYtNDU4ZC1hNzdkLTg1ZmE5NjBkNmE3ZS5qcGc=",
//           "type": null,
//           "width": 3600,
//           "height": 5550
//       },
//       {
//           "url": "https://resizing.flixster.com/fncfFsJjBmIhyYAqVjmulQc6c3s=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzYwZTQ0YzQyLTE2MzQtNGFkOS04NmIzLWVlMTU5ZDJlNjU3ZC5qcGc=",
//           "type": null,
//           "width": 2025,
//           "height": 3000
//       },
//       {
//           "url": "https://resizing.flixster.com/y_zlH4NLp_-Ums0dxXKVGgD4oDo=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2U5ZmNjNDYyLTdkYmUtNGVlZi05MTQzLTY2YjQyZjA4Y2E5Ni5qcGc=",
//           "type": null,
//           "width": 2025,
//           "height": 3000
//       },
//       {
//           "url": "https://resizing.flixster.com/optiMGJx4P3KHYFpa8nfUXjvK-I=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2FkNzFiY2I4LWFlNmQtNDc1Ny05YjEwLTYyZmY2M2Y0MzZlMy5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/u6-aT0qOxC3uq0X597_C57cLOtg=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzA4ZDBlMWU2LWVkMzktNDUzOC1hZGFkLTZlYjBiMGQ3YTAwOC5qcGc=",
//           "type": null,
//           "width": 2000,
//           "height": 1333
//       },
//       {
//           "url": "https://resizing.flixster.com/o4U-RRL-g__z9rXyED8ahUngpvU=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzM0ODRlZmMxLTk4MDYtNDNhZi04ZjA1LTBiYzM3ZmI5NDNmNy5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/ooihX3qFvzuEmGSRtNautbXdzik=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ExNDZiODczLWRkYzYtNDdlZC04YWRjLWEyOWVkYjMxMzAzZC5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/JqdNxAgstWezj2pv-3kM3RKZWPg=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQ5OTNhYmVmLTg2ZDUtNGMyNS05ZGYxLTRjODI4YTk1ODljZC5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/T0TPtnye-TjMfy1wEiTpeId1K00=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzE2ZWM3MzgzLTYyMzYtNGY4NS1hOTY0LWFlYjAwMGJjY2MzZC5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/WNB8WW9TGaMN_y3kBxwxQxd1VZo=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzAyN2Y3ZTI3LWM4MWMtNGM4Zi1hMzY1LTQwMzAxMWNhNjJkOC5qcGc=",
//           "type": null,
//           "width": 2025,
//           "height": 3000
//       },
//       {
//           "url": "https://resizing.flixster.com/tjpYkdIMnwVy_MHYRQrqDPXAXwQ=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2M3Mjc4Nzk5LTJlNzAtNDk0MS05ZjA4LTkxYjk0N2Y0ODNkMC5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/N6o01kPSh8JyUK9-k_-yuSegKKA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2FlNDZiYzNlLTI3ZjItNDUyNC1iY2FhLWI1OWQ5ZGNmOWM1MC5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/IF5JfF4YikMWM_LQXZ430w5FCgQ=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzA3ODU2MDUxLTg5NjMtNGFlMi04M2EwLTk1MTc2YjM1NjNhMi5qcGc=",
//           "type": null,
//           "width": 2025,
//           "height": 3000
//       },
//       {
//           "url": "https://resizing.flixster.com/kgKzo9YT4STtE-N5lOAsBvRJ0P8=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzdjOTg2MjRlLTdkODktNDI0NS05OTUxLTZjNmZlNjVlNzU4Yy5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/GURNJqlr-c-jjoSmeHhx2z8w2jY=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzM3MDM1OGFjLTA1OTUtNDhiYy1hNGE5LTZmOTFiMmNjZWFhMC5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/ayiSi8HrUS3_i-Jkru1P2oMM58Q=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhiODAwYWIyLTM1MmItNGI1ZS1iOWQzLTdjZjAzMzI1MDc2Yy5qcGc=",
//           "type": null,
//           "width": 4051,
//           "height": 6001
//       },
//       {
//           "url": "https://resizing.flixster.com/u9hPrULctaaA_DD3PJwcU4l2Hj4=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2NmYmY5NGFmLTdmMTItNGU1Mi1iMDhlLThlMzUzNmViMzZmZS5qcGc=",
//           "type": null,
//           "width": 6000,
//           "height": 4000
//       },
//       {
//           "url": "https://resizing.flixster.com/k7YeGdoZzjAb4D3itY9ZJ9AQtDc=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQyZmRhMDZmLTRhNWUtNGJkOC1hYjc2LTQ4Mzk3YjllNDBmMC5qcGc=",
//           "type": null,
//           "width": 2025,
//           "height": 3000
//       },
//       {
//           "url": "https://resizing.flixster.com/t5YMrOHWRLcEoK-QnvlHy1wKdso=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzdiMDBmYjYzLTMyMzktNDEwNC1iOTlkLWIwYmQ0MzhjNzEwMS5qcGc=",
//           "type": null,
//           "width": 2025,
//           "height": 3000
//       }
//   ],
//   "cast": [
//       {
//           "id": 1443,
//           "role": "Actor",
//           "name": "Keanu Reeves",
//           "characterName": "John Wick",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/1443_v9_bc.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 72374,
//           "role": "Actor",
//           "name": "Donnie Yen Ji-Dan",
//           "characterName": "Caine",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/72374_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 596590,
//           "role": "Actor",
//           "name": "Bill Skarsgård",
//           "characterName": "Marquis",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/596590_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 71229,
//           "role": "Actor",
//           "name": "Laurence Fishburne",
//           "characterName": "Bowery King",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/71229_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 70116,
//           "role": "Actor",
//           "name": "Hiroyuki Sanada",
//           "characterName": "Shimazu",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/70116_v9_bc.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 676319,
//           "role": "Actor",
//           "name": "Shamier Anderson",
//           "characterName": "Tracker",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/676319_v9_bc.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 158649,
//           "role": "Actor",
//           "name": "Lance Reddick",
//           "characterName": "Charon",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/158649_v9_bc.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 1408341,
//           "role": "Actor",
//           "name": "Rina Sawayama",
//           "characterName": "Akira",
//           "headShotImage": {
//               "url": "https://resizing.flixster.com/2aSqbG62NIvdeBxw-B-87tBZd9Y=/ems.cHJkLWVtcy1hc3NldHMvY2VsZWJyaXRpZXMvNTg4NDFlNTMtMjljZS00OTQ5LWJkNTMtZmUyNDMzNGJkODA4LmpwZw==",
//               "type": null,
//               "width": 4000,
//               "height": 2669
//           }
//       },
//       {
//           "id": 290115,
//           "role": "Actor",
//           "name": "Scott Adkins",
//           "characterName": "Killa",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/290115_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 84420,
//           "role": "Actor",
//           "name": "Ian McShane",
//           "characterName": "Winston",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/84420_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 511803,
//           "role": "Actor",
//           "name": "Marko Zaror",
//           "characterName": "Chidi",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/511803_v9_bc.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 488371,
//           "role": "Actor",
//           "name": "Natalia Tena",
//           "characterName": null,
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/488371_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 1603133,
//           "role": "Actor",
//           "name": "Aimée Kwan",
//           "characterName": null,
//           "headShotImage": null
//       },
//       {
//           "id": 82031,
//           "role": "Actor",
//           "name": "Clancy Brown",
//           "characterName": null,
//           "headShotImage": {
//               "url": "https://resizing.flixster.com/QzLqHxOSj4VcsnQ3VPhIKp0Tiu8=/ems.cHJkLWVtcy1hc3NldHMvY2VsZWJyaXRpZXMvZDcwMzI5N2MtMjRjMi00NmE2LTg5NTctMTk5MmZiMmU2YjYwLnBuZw==",
//               "type": null,
//               "width": 750,
//               "height": 1000
//           }
//       }
//   ],
//   "crew": [
//       {
//           "id": 93203,
//           "role": "Director",
//           "name": "Chad Stahelski",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/93203_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 1219621,
//           "role": "Screenwriter",
//           "name": "Shay Hatten",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/1219621_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 574116,
//           "role": "Screenwriter",
//           "name": "Michael Finch",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/574116_v9_ba.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 295214,
//           "role": "Producer",
//           "name": "Basil Iwanyk",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/295214_v9_ba.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 1131745,
//           "role": "Producer",
//           "name": "Erica Lee",
//           "headShotImage": null
//       },
//       {
//           "id": 93203,
//           "role": "Producer",
//           "name": "Chad Stahelski",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/93203_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 1443,
//           "role": "Executive Producer",
//           "name": "Keanu Reeves",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/1443_v9_bc.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 418180,
//           "role": "Executive Producer",
//           "name": "Louise Rosner",
//           "headShotImage": null
//       },
//       {
//           "id": 221570,
//           "role": "Executive Producer",
//           "name": "David Leitch",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/221570_v9_bc.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 138441,
//           "role": "Executive Producer",
//           "name": "Michael Paseornek",
//           "headShotImage": null
//       },
//       {
//           "id": 458882,
//           "role": "Cinematographer",
//           "name": "Dan Laustsen",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/458882_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 1388818,
//           "role": "Film Editing",
//           "name": "Nathan Orloff",
//           "headShotImage": null
//       },
//       {
//           "id": 459855,
//           "role": "Original Music",
//           "name": "Tyler Bates",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/459855_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 580950,
//           "role": "Original Music",
//           "name": "Joel J. Richard",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/580950_v9_ba.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 459271,
//           "role": "Production Design",
//           "name": "Kevin Kavanaugh",
//           "headShotImage": null
//       },
//       {
//           "id": 609834,
//           "role": "Art Director",
//           "name": "Andreas Olshausen",
//           "headShotImage": null
//       },
//       {
//           "id": 558347,
//           "role": "Set Decoration",
//           "name": "Mark Rosinski",
//           "headShotImage": null
//       },
//       {
//           "id": 481601,
//           "role": "Costume Design",
//           "name": "Paco Delgado",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/481601_v9_bb.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       },
//       {
//           "id": 835230,
//           "role": "Casting",
//           "name": "Kharmel Cochrane",
//           "headShotImage": {
//               "url": "https://flxt.tmsimg.com/assets/835230_v9_aa.jpg",
//               "type": "image/jpg",
//               "width": 1080,
//               "height": 1440
//           }
//       }
//   ],
//   "motionPictureRating": {
//       "area": null,
//       "code": "R",
//       "description": "Restricted"
//   },
//   "ovds": [],
//   "criticReviews": null,
//   "audienceReviews": {
//       "totalCount": 7738,
//       "nextOffset": 4,
//       "hasNextPage": true,
//       "hasPreviousPage": false,
//       "items": [
//           {
//               "userFullName": null,
//               "userImage": null,
//               "iconImage": null,
//               "rating": 4.5,
//               "isInterested": null,
//               "comment": "This truly was a masterpiece in action. They continued the John Wick style of ass kicking action with still somehow making it truly look breathe takingly beautiful. The story line is simple yet works perfectly for this great franchise."
//           },
//           {
//               "userFullName": null,
//               "userImage": null,
//               "iconImage": null,
//               "rating": 5,
//               "isInterested": null,
//               "comment": "Get ready for nearly three hours of stunning, blood-pumping action as Mr. Wick returns with a vengeance. Fully healed and ready for battle, Keanu Reeves delivers yet another outstanding performance, complete with thrilling stunts like the now-famous stairway scene.\n\nSet against the visually captivating backdrops of Osaka, Japan, and Paris, France, John Wick 4 is undeniably one of the most visually stunning action films of our time.\n\nEach new character introduced brings depth and intrigue, keeping the audience engaged and invested in their stories. The excitement doesn't stop there, as a spin-off movie and a show have been confirmed to expand the John Wick universe even further.\n\nWith over $80 million in box office revenue within just a few days, it's clear that John Wick 4 is a must-see. Don't hesitate to grab your ticket and immerse yourself in this unforgettable, action-packed cinematic experience!"
//           },
//           {
//               "userFullName": null,
//               "userImage": null,
//               "iconImage": null,
//               "rating": 2.5,
//               "isInterested": null,
//               "comment": "The entire movie, except about 20 minutes, was a none stop unrealistic fight/shoot out scene.  Wick,s main pistol held 21 rounds but in many scenes Wick fired over 50 rounds from one magazine without reloading.  In many of the indoor scenes Wick exchanged 100,s of bullets with the bad guys with semi auto firearms but you could not see one empty casing on the ground or one being ejected from the firearms.  Cheezy.  I almost forgot to mention Wick's suit which was bullet proof and stopped 100,s of rounds from pistols and bullets from rifles shooting 5.56 ammo.  Even if the suit (which was as thick as your bath towel) could prevent bullets from penetrating, the transfer of kinetic energy on to the human body would kill a person with a few hits on the suit.  Too long, unrealistic, and boring because of the lengthy over the top fight scenes.  I thought John Wick 4 was a going to morph into a Matrix movie."
//           },
//           {
//               "userFullName": null,
//               "userImage": null,
//               "iconImage": null,
//               "rating": 5,
//               "isInterested": null,
//               "comment": "awesome movie great action best John wick movie"
//           }
//       ]
//   },
//   "showtimeGroupings": {
//       "fandangoId": "228578",
//       "movieId": "gydSakSZ8uPyTxwI8x",
//       "displayDates": [
//           "2023-03-28",
//           "2023-03-29",
//           "2023-03-30",
//           "2023-03-31",
//           "2023-04-01",
//           "2023-04-02",
//           "2023-04-03",
//           "2023-04-04",
//           "2023-04-05",
//           "2023-04-06",
//           "2023-04-07",
//           "2023-04-08",
//           "2023-04-09",
//           "2023-04-10",
//           "2023-04-11",
//           "2023-04-12"
//       ],
//       "displayDate": "2022-08-21",
//       "mppBaseUrl": "https://www.flixster.com/switchboard/internal-checkout?mid={mid}&tid={tid}&a={a}&date={sdate}&datetime={sdate}",
//       "theaters": []
//   }
// }