import { Component } from 'react';
import FoodFilter from './FoodFilter';
import Food from './Food';
import { categories as categoriesMock, foods as foodsMock } from '../mocks/data';

class Pratos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: categoriesMock.slice().map((category) => {
                return {
                    "value": category.value,
                    "name": category.name,
                    "isSelected": false
                }
            }),
            filterExpression: ""
        };
        this.onCategoriesChanged = this.onCategoriesChanged.bind(this);
        this.onFilterExpressionChanged = this.onFilterExpressionChanged.bind(this);
    }
    
    onCategoriesChanged(value) {
        const categories = this.state.categories.slice();
        categories.forEach(category => {
            if (category.value === value) {
              category.isSelected = !category.isSelected;
              return;
            }
        });
        this.setState({categories: categories});
    }

    onFilterExpressionChanged(e) {
        this.setState({
            filterExpression: e.target.value
        });
    }
    
    render() {
        const selectedCategories = this.state.categories.filter(category => category.isSelected);
        const foods = foodsMock.filter(food => {
                let categoryOk = selectedCategories.length === 0
                    || food.categories.filter(category => selectedCategories.some(selectedCategory => selectedCategory.value === category.value)).length > 0;
                let filterExpressionOk = this.state.filterExpression === ''
                    || food.name.toUpperCase().indexOf(this.state.filterExpression.toUpperCase()) !== -1
                return categoryOk && filterExpressionOk;
        }).map(food =>
            <li key={food.id}>
                <Food food={food}/>
            </li>
        );
        return (
            <section>
                <FoodFilter 
                    filterExpression={ this.state.filterExpression }
                    onFilterExpressionChanged={ this.onFilterExpressionChanged }
                    categories={ this.state.categories } 
                    onCategoriesChanged={ this.onCategoriesChanged }/>
                { foods }
            </section>
        );
    }
}

export default Pratos;