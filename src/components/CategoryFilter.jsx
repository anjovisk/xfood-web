import { Component } from 'react';
import Toggle from './Toggle';

class CategoryFilter extends Component {
    render() {
        const categories = this.props.categories.slice().map(category =>
            <li key={category.value}>
            <Toggle 
                value={category.value} 
                caption={category.name}
                state={category.isSelected ? "checked" : "unchecked"}
                onStateChanged={this.props.onCategoriesChanged}/>
            </li>
        );
        return (
            <ul>
                {categories}
            </ul>
        );
    }
}

export default CategoryFilter;