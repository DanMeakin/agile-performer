import { selectMetric } from "../actions";

class NavBar extends Component {

  renderMenuItems(){
    this.props.menuItems.map((item)
  }

  render(){
    return(
      <div>
        <ul className="menu vertical">
          {this.renderMenuItems()}
        </ul>
      </div>
    )
  }
}
