import * as React from 'react';
import { Container, Header } from 'semantic-ui-react';

import ReviewScheduleTable from './ReviewScheduleTable';

const App: React.SFC = () => (
    <div style={{ margin: '20px 0' }}>
        <Container>
            <br />
            <Header as='h1'>Review schedule 🤟</Header>
            <ReviewScheduleTable />
        </Container>
    </div>
);

export default App;