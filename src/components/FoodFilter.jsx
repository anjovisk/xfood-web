import { Component } from 'react';
import CategoryFilter from './CategoryFilter';

class FoodFilter extends Component {
    render() {
        return (
            <div>
                <input 
                    value={ this.props.filterExpression }
                    onChange={ this.props.onFilterExpressionChanged }
                />
                <CategoryFilter 
                    categories={this.props.categories}
                    onCategoriesChanged={ this.props.onCategoriesChanged }/>
            </div>
        );
    }
}

export default FoodFilter;