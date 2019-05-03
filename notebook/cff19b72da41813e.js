// URL: https://observablehq.com/d/cff19b72da41813e
// Title: club
// Author: Sam Liu (@ontouchstart)
// Version: 24
// Runtime version: 1

const m0 = {
  id: "cff19b72da41813e@24",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# club
The library to provide club profile and avatar data

Usage

<pre>import {club} from "cff19b72da41813e"</pre>

`
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3@5')
)})
    },
    {
      name: "club",
      inputs: ["d3"],
      value: (function(d3)
{ 
  let club = {}
  club.profile = 
d3.json('https://www.mocaspike150.org/api/club/profile.json')
  club.avatar =
d3.json('https://www.mocaspike150.org/api/club/avatar.json')
  return club
}
)
    }
  ]
};

const notebook = {
  id: "cff19b72da41813e@24",
  modules: [m0]
};

export default notebook;
