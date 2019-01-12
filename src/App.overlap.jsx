import React, { Component } from 'react';
import classNames from "classnames"
import './App.css';
import "ion-sound"

let qwerty = [
  [
    { "letter": "q", "code": 81, sound: "WorkIt", label: "Work It", levels: [1, 2] },
    { "letter": "w", "code": 87, sound: "MakeIt", label: "Make It", levels: [1, 2] },
    { "letter": "e", "code": 69, sound: "DoIt", label: "Do it", levels: [1, 2] },
    { "letter": "r", "code": 82, sound: "MakesUs", label: "Makes Us", levels: [1, 2] },
    { "letter": "t", "code": 84 },
    { "letter": "y", "code": 89, sound: "MoreThan", label: "More Than", levels: [1, 2, 3] },
    { "letter": "u", "code": 85, sound: "Hour", label: "Hour", levels: [1, 2, 3] },
    { "letter": "i", "code": 73, sound: "Our", label: "Our", levels: [1, 2, 3] },
    { "letter": "o", "code": 79, sound: "Never", label: "Never", levels: [1, 2, 3] },
    { "letter": "p", "code": 80 }
  ],
  [
    { "letter": "a", "code": 65, sound: "Harder", label: "Harder", levels: [1, 2] },
    { "letter": "s", "code": 83, sound: "Better", label: "Better", levels: [1, 2] },
    { "letter": "d", "code": 68, sound: "Faster", label: "Faster", levels: [1, 2] },
    { "letter": "f", "code": 70, sound: "Stronger", label: "Stronger", levels: [1, 2] },
    { "letter": "g", "code": 71 },
    { "letter": "h", "code": 72, sound: "Ever", label: "Ever", levels: [1, 2, 3] },
    { "letter": "j", "code": 74, sound: "After", label: "After", levels: [1, 2, 3] },
    { "letter": "k", "code": 75, sound: "WorkIs", label: "Work Is", levels: [1, 2, 3] },
    { "letter": "l", "code": 76, sound: "Over", label: "Over", levels: [1, 2, 3] },
    { "letter": ";", "code": 186 }
  ],
  [
    { "letter": "z", "code": 90, level: 1, label: "Normal" },
    { "letter": "x", "code": 88, level: 2, label: "High" },
    { "letter": "c", "code": 67 },
    { "letter": "v", "code": 86 },
    { "letter": "b", "code": 66 },
    { "letter": "n", "code": 78, level: 3, label: "Low" },
    { "letter": "m", "code": 77 },
    { "letter": ",", "code": 188 }
  ],
  [
    { "letter": "", "code": 32, label: 'Instrumental' }]
]

class App extends Component {
  constructor() {
    super()
    this.state = {
      keyboard: qwerty,
      level: 1,
      src: "beat.mp3",
      beat: false,
      beatBar: 0,
      keys: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0]]
    }
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.path = '/sound/'
  }
  componentWillMount() {
    //
    this.beat = new Audio('/sound/' + this.state.src)
    this.beat.addEventListener('timeupdate', () => {
      this.setState({
        beatBar: 100 * this.beat.currentTime / this.beat.duration
      })
    });
    this.sfx = {}
    let sounds = [
      {
        name: 'beat'
      }, {
        name: 'WorkIt1'
      }, {
        name: 'MakeIt1'
      }, {
        name: 'DoIt1'
      }, {
        name: 'MakesUs1'
      }, {
        name: 'Harder1'
      }, {
        name: 'Better1'
      }, {
        name: 'Faster1'
      }, {
        name: 'Stronger1'
      }, {
        name: 'MoreThan1'
      }, {
        name: 'Hour1'
      }, {
        name: 'Our1'
      }, {
        name: 'Never1'
      }, {
        name: 'Ever1'
      }, {
        name: 'After1'
      }, {
        name: 'WorkIs1'
      }, {
        name: 'Over1'
      }, {
        name: 'WorkIt2'
      }, {
        name: 'MakeIt2'
      }, {
        name: 'DoIt2'
      }, {
        name: 'MakesUs2'
      }, {
        name: 'Harder2'
      }, {
        name: 'Better2'
      }, {
        name: 'Faster2'
      }, {
        name: 'Stronger2'
      }, {
        name: 'MoreThan2'
      }, {
        name: 'Hour2'
      }, {
        name: 'Our2'
      }, {
        name: 'Never2'
      }, {
        name: 'Ever2'
      }, {
        name: 'After2'
      }, {
        name: 'WorkIs2'
      }, {
        name: 'Over2'
      }, {
        name: 'MoreThan3'
      }, {
        name: 'Hour3'
      }, {
        name: 'Our3'
      }, {
        name: 'Never3'
      }, {
        name: 'Ever3'
      }, {
        name: 'After3'
      }, {
        name: 'WorkIs3'
      }, {
        name: 'Over3'
      }
    ]
    document.addEventListener('keydown', (e) => {
      e.preventDefault()
      this.onKeyDown(e)
    })
    document.addEventListener('keyup', (e) => {
      e.preventDefault()
      this.onKeyUp(e)
    })
  }
  onKeyDown(e) {
    let key = e.keyCode || e.which
    let { keys } = this.state
    for (let i in this.state.keyboard) {
      for (let j in this.state.keyboard[i]) {
        if (this.state.keyboard[i][j].code === key) {
          keys[i][j] = true
          if (this.state.keyboard[i][j].sound) {
            let audio = new Audio(this.path + this.state.keyboard[i][j].sound + this.state.level + '.mp3')
            audio.play()
          } else if (this.state.keyboard[i][j].level) {
            this.setState({
              level: this.state.keyboard[i][j].level
            })
          }
          if (key === 32) {
            if (!this.state.beat) {
              this.beat.play()
            } else {
              this.beat.pause()
              this.beat.currentTime = 0
            }
            this.setState({
              beat: !this.state.beat
            })

          }
        }
      }
    }
    this.setState({
      keys
    })
  }
  onKeyUp(e) {
    let key = e.keyCode || e.which
    let { keys } = this.state
    for (let i in this.state.keyboard) {
      for (let j in this.state.keyboard[i]) {
        if (this.state.keyboard[i][j].code === key) {
          keys[i][j] = false
        }
      }
    }
    this.setState({
      keys
    })
  }
  render() {
    return (
      <div className="App">
        <select onChange={e=>{
          this.setState({
            src: e.target.value
          })
          console.log(e.target.value)
          this.beat.pause()
          this.beat.src = '/sound/' + e.target.value
          if(e.target.value === 'beat.mp3'){
            this.beat.volume = 1
          }else{
            this.beat.volume = .4
          }
        }} value={this.state.src}>
          <option value="beat.mp3">Classic</option>
          <option value="alternative.mp3">Huynya</option>
        </select>
        <div className={classNames({
          keyboard: true,
          level1: this.state.level === 1,
          level2: this.state.level === 2,
          level3: this.state.level === 3
        })}>
          {
            this.state.keyboard.map((row, i) => (
              <div key={i} className={`row row-${i + 1}`}>
                {row.map((key, j) => (
                  <div key={j} className={`key ${key.letter} ${key.level ? "level-key" : (key.levels && key.levels.indexOf(this.state.level) >= 0 ? 'active' : 'disabled')}${this.state.keys[i][j] ? ' is-active' : ''}`}>
                    <span className="letter">{key.letter}</span>
                    {key.code === 32 ? <div style={{
                      width: this.state.beatBar + '%'
                    }} className="bar"></div> : null}
                    <span className="label">{key.label}</span>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
