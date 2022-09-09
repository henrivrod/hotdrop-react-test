import React,{ useState } from 'react';
import './App.css';

function App() {
    const [pics, setPics] = useState([]);

    class NameForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: ''};

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event) {
            this.setState({value: event.target.value});
        }

        handleSubmit(event) {
            event.preventDefault();
            fetch('https://api.imgur.com/3/gallery/t/'+ this.state.value, {
                headers: {
                    'Authorization': 'Client-ID 8f4af73167830de'
                }
                /*API call to Imgur requesting a gallery of images and albums associated with the tag the user input*/
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPics(data.data)
            })
        }

        render() {
            return (
                <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Search Input:
                        <input type="text" value={this.state.value} onChange={this.handleChange} required/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                    {pics.total_items > 0 && (
                        <ul>
                            {pics.items.map(image => {
                                /*The API call returns an array of images AND albums of images so the code needs to iterate through the items:
                                * if an item is a still image, the image is displayed. If it is an album, the code iterates through its individual images and shows those*/
                                if (!image.is_album) {if(!image.animated) {return <li key={image.id}><img src={image.link}></img><div>Account: {image.account_url}</div><div>Upvotes: {image.ups}</div><div>Downvotes: {image.downs}</div></li>}}
                                if (image.is_album) {return image.images.map(item => {if(!item.animated) {return (<li key={item.id}><img src={item.link}></img><div>Account: {image.account_url}</div><div>Upvotes: {image.ups}</div><div>Downvotes: {image.downs}</div></li>)}})}
                            }
                            )}
                        </ul>
                    )}
                </div>
            );
        }
    }

  return (
      <NameForm />
      )
}

export default App;
