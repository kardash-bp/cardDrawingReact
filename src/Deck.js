import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import './Deck.css'
class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deckId: null,
      remaining: 52,
      shuffled: false,
      error: null,
      cards: [{ image: '' }]
    }
    this.drawCard = this.drawCard.bind(this)
    this.reshuffle = this.reshuffle.bind(this)
  }
  async componentDidMount() {
    try {
      const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      this.setState({
        deckId: res.data.deck_id,
        remaining: res.data.remaining,
        shuffled: res.data.shuffled
      })
      this.drawCard(res.data.deck_id)

    } catch (e) {
      this.setState({ error: e })
    }
  }
  async drawCard(id) {
    const url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`
    try {
      const res = await axios.get(url)
      if (!res.data.cards[0]) return
      this.setState(prevSt => {
        return {
          remaining: res.data.remaining,
          shuffled: false,
          cards: !prevSt.cards[0].image ? res.data.cards : [...prevSt.cards, ...res.data.cards]
        }
      })

    } catch (e) {
      this.setState({ error: e })
    }
  }
  async reshuffle() {
    const result = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/shuffle/`)
    this.setState({
      remaining: result.data.remaining,
      shuffled: result.data.shuffled,
      cards: [{ image: '' }]
    })
  }
  render() {
    return (
      <div>
        <p style={{ color: '#00ffe5' }}>{this.state.remaining}</p>
        <button disabled={this.state.shuffled} onClick={this.reshuffle} >Reshuffle</button>
        <button onClick={() => (this.drawCard(this.state.deckId))} >Draw a Card</button>
        <div className='Deck'>
          {this.state.cards.map((c, idx) => {
            return <Card key={idx} image={c.image} name={c.code} />
          })}
        </div>

      </div>
    )
  }
}

export default Deck
