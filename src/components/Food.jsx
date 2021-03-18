import { Component } from 'react';

class Food extends Component {
    render() {
        return(
            <article>
                <h2>{ this.props.food.name }</h2>
                <p>{ this.props.food.categories.map(category => category.name).join(',') }</p>
                <p>{ this.props.food.description }</p>
            </article>
        );
    }
}

export default Food;