import { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Toggle from './Toggle';

class CategoryFilter extends Component {
    render() {
        const categories = this.props.categories.slice().map(category =>
            <Toggle key={category.value}
                value={category.value} 
                caption={category.name}
                isToggleOn={category.isSelected}
                onStateChanged={this.props.onCategoriesChanged}/>
        );
        return (
            <ButtonGroup toggle className="flex-wrap">
                {categories}
            </ButtonGroup>
        );
    }
}

export default CategoryFilter;