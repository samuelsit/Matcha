import React, { Component } from 'react'

class Pagination extends Component {
    render () {
        return (
            <nav aria-label="Page navigation example" className="mt-3">
                <ul className="pagination justify-content-start">
                    <li className="page-item disabled">
                        <div className="page-link" aria-disabled="true">Previous</div>
                    </li>
                    <li className="page-item">
                        <div className="page-link">Next</div>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination