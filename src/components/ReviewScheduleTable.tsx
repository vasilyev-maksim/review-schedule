import * as React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import moment from 'moment';

import getReviewSchedule from '../getReviewSchedule';
import { backendSquads } from '../squads';
import { ESquadName } from '../models';
import { Reviewer } from './Reviewer';

const ReviewSchedule: React.SFC = () => {
    const schedule = getReviewSchedule(backendSquads);
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <Icon name="calendar alternate outline" /> Date
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <Icon name="playstation" /> Daily Banking
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <Icon name="shipping fast" /> Factoring
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        <Icon name="ship" /> Onboarding
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {schedule.map(day => (
                    <Table.Row negative={day.day.isSame((moment()), 'day')} key={day.day.unix()}>
                        <Table.Cell>
                            {day.day.format('DD MMM YYYY')}
                        </Table.Cell>
                        <Table.Cell>
                            <Reviewer reviewer={day.reviewers[ESquadName.DailyBanking]} />
                        </Table.Cell>
                        <Table.Cell>
                            <Reviewer reviewer={day.reviewers[ESquadName.Factoring]} />
                        </Table.Cell>
                        <Table.Cell>
                            <Reviewer reviewer={day.reviewers[ESquadName.Onboarding]} />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default ReviewSchedule;