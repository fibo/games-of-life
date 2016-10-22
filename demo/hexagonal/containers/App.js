import Root from '../components/Root'
import { connect } from 'react-redux'

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Root)
