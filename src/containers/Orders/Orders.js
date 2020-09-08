import React, { Component } from 'react'
import Order from '../../components/UI/Order/Order'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class Orders extends Component {
    
    componentDidMount = () => {
        this.props.fetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = (
            this.props.orders.map( order => {
                return <Order key={order.id} id={order.id} ingredients={order.ingredients} totalPrice={+order.price}/>;
            })
        )
        if (this.props.orders.length === 0) {
            orders = <h1>You didn't place any orders :(</h1>
        }
        if (this.props.loading) {
            orders = <Spinner />
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
