import { Container, Row, Col, Button } from 'reactstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import useDashboard from './hook';
import styles from './styles/style.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { states } = useDashboard();
  const { options, isFinal, defaultData, data, gameWsData } = states;

  return (
    <Container>
      <Row>
        <Col
          xxl={{size: 8, offset: 2}}
          className={styles['dashboard-chart']}
          data-testid={isFinal ? 'data' : 'defaultData'}
        >
          <Line
            options={options}
            data={isFinal ? data : defaultData}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{size: 3, offset: 2}} className={styles['dashboard-block']}>
          <Button
            color="warning"
            className={styles['dashboard-button']}
            data-testid="button-yellow"
          >{ gameWsData ? gameWsData.subcribe.orange : 0 }</Button>
        </Col>
        <Col xs={{size: 3, offset: 2}} className={styles['dashboard-block']}>
          <Button
            color="primary"
            className={styles['dashboard-button']}
            data-testid="button-blue"
          >{ gameWsData ? gameWsData.subcribe.blue : 0 }</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;