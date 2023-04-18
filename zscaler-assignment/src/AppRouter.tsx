
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Custom Component
import Page404 from '../src/view/Page404';
import Page500 from '../src/view/Page500';
import EventGraph from '../src/view/EventGraph';
import AttackerDetails from './view/AttackerDetails';


function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={EventGraph} />
                <Route  exact path="/events-graph" component={EventGraph} />
                <Route  exact path="/attacker-details" component={AttackerDetails} />
                <Route path="" component={Page404} />
                <Route path="*" component={Page500} />
            </Switch>
        </Router>
    );
}

export default AppRouter;