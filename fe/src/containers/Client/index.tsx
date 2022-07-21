import { PUNCH_TYPES } from '@/share/const';
import { useCallback } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import useClient from './hook';
import styles from './styles/style.module.css';

const Client = () => {
  const { handlers } = useClient();
  const { clickHandler } = handlers;

  return (
    <Container className={styles['gameClient-container']}>
      <Row>
        <Col className={styles['gameClient-block']}>
          <Button
            color="warning"
            className={styles['gameClient-button']}
            data-testid="button-yellow"
            onClick={() => clickHandler(PUNCH_TYPES.ORANGE)}
          >-</Button>
        </Col>
        <Col className={styles['gameClient-block']}>
          <Button
            color="primary"
            className={styles['gameClient-button']}
            data-testid="button-blue"
            onClick={() => clickHandler(PUNCH_TYPES.BLUE)}
          >+</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Client;