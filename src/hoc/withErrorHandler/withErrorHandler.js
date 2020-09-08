import React, { Component } from 'react' 

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrapperComponent, axios ) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.reqInterceptor = axios.interceptors.request.use( request => {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.error = null
                return request
            })
            this.resInterceptor = axios.interceptors.response.use( response => 
                {
                    return response
                }, error  => {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.setState({
                    error: error
                })
                return Promise.reject(error);
            })
        }

        state = {
            error: null
        }
        
        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render () {
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler