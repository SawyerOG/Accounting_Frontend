import React, { useState } from 'react';

import { socket } from '../../Config/URL';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Popover from '../../Components/Popover';

import Screen from '../../Components/Screen/Screen';
import Button from 'react-bootstrap/Button';

interface ReportButton {
    title: string;
    onClick: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    tipText: string;
}

const reports: ReportButton[] = [
    {
        title: 'Billing',
        onClick: () => console.log('billing has been clicked'),
        color: 'primary',
        tipText: 'Information related to the billing reports',
    },
    {
        title: 'Check History',
        onClick: () => console.log('check history has been clicked'),
        color: 'secondary',
        tipText: 'Information related to the Check History reports',
    },
    {
        title: 'Census',
        onClick: () => socket.emit('test'),
        color: 'info',
        tipText: 'Information related to the Census report',
    },
];

const filterReports = (searchText: string) => {
    const filteredReports = [...reports].filter((i) => i.title.toLowerCase().includes(searchText.toLowerCase()));
    return filteredReports;
};

const Reports = () => {
    const [filteredReports, setFilteredReports] = useState<ReportButton[] | null>(reports);

    const getFilteredReports = (searchValue: string) => {
        console.log(searchValue);
        if (searchValue) {
            const filteredReports = filterReports(searchValue);
            console.log(filteredReports);
            console.log(filteredReports.length);

            if (filteredReports.length === 0) {
                setFilteredReports(null); //Let null indicate a filter is in place but returning no results
            } else {
                setFilteredReports(filteredReports);
            }
        } else {
            // search is blank so empty the filter
            setFilteredReports(reports);
        }
    };

    return (
        <Screen>
            <div className='flex-column  flex-grow-1' style={{ width: '20%', height: '90vh' }}>
                <InputGroup className='pt-2'>
                    <InputGroup.Prepend>
                        <InputGroup.Text id='search-icon'>
                            <i className='bi bi-search' role='img' aria-label='Search'></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder='Search Reports'
                        aria-label='Search Reports'
                        aria-describedby='search-icon'
                        onChange={(e) => getFilteredReports(e.target.value)}
                    />
                </InputGroup>
                {filteredReports !== null ? (
                    filteredReports.map((i) => (
                        <Popover
                            key={i.title}
                            delay={500}
                            direction='right'
                            reportName={i.title}
                            tooltipText={i.tipText}
                            button={
                                <Button variant={i.color} onClick={i.onClick} block className='my-2'>
                                    {i.title}
                                </Button>
                            }
                        />
                    ))
                ) : (
                    <p>There are no reports like this</p>
                )}
            </div>
        </Screen>
    );
};

export default Reports;
