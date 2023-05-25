import { rooms } from './suggestions'
import * as loader from './loader'

const searchWrapper = document.querySelector('.search-input')
const inputBox = searchWrapper.querySelector('input')
const suggBox = searchWrapper.querySelector('.autocom-box')

let filteredSuggestions

suggBox.onclick = () => {
  boot(filteredSuggestions[0])
}

// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value
  filteredSuggestions = []

  userData = userData.toLocaleLowerCase().replace(/\s/g, '')

  if (userData) {
    if (e.keyCode == 13) {
      boot(userData)
    }

    // filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
    filteredSuggestions = Object.keys(rooms).filter((data) => {
      return data.toLocaleLowerCase().includes(userData)
    })

    searchWrapper.classList.add('active')

    try {
      showSuggestions(filteredSuggestions)
    } catch (e) {
      searchWrapper.classList.remove('active')
    }
  } else {
    searchWrapper.classList.remove('active') //hide autocomplete box
  }
}

function showSuggestions(list) {
  list = list.map((data) => {
    // passing return data inside li tag
    return (data = 'Click to search for: ' + data)
  })

  let listData
  let maxLength = 1
  if (!list.length) {
    userValue = inputBox.value
    listData = '<li>' + userValue + '</li>'
  } else {
    listData = list.slice(0, maxLength).join('')
  }

  suggBox.innerHTML = listData
}

function boot(userData) {
  loader.loadFloor(
    'Models/Våning' + rooms[userData].floor + '.glb',
    0.1,
    0,
    -20,
    0
  )
  loader.moveHighlighter(rooms[userData].position)
  document.getElementById('våningText').textContent =
    'Floor: ' + rooms[userData].floor

  //rooms är en nyckelvärdetabell där rummet (userdata) används som nyckel
  //värdet är ett objekt med position och våning
}

//__________________________________________________

window.onclick = function (event) {
  document.getElementById('myDropdown').classList.toggle('show')

  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content')
    var i
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i]
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
      }
    }
  }
}
