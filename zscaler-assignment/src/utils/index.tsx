import styled from 'styled-components';

export const SIDEBAR_ITEMS = [
  {
    title: 'Events Graph',
    path: '/events-graph'
  },
  {
    title: 'Attacker Details',
    path: '/attacker-details'
  }
];

export const ChartContainer = styled.div`
  text {
    font-family: "Untitled Sans", sans-serif;
  }

  .visx-axis-tick {
    text {
      font-size: 12px;
      font-weight: 400;
      fill: #666666;
    }
  }
`;

export const tickLabelOffset = 10;


export const ColoredSquare = styled.div`
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 8px;
  background: ${({ color }) => color};
  border-radius: 4px;
`;


export const TooltipContainer = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  border-radius: 4px;
  color: #222222;

  .date {
    font-size: 12px;
    margin-bottom: 8px;
    color: #222222;
    font-weight: 600;
  }
  .value {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: #000000;
  }
`;

export const ATTACKER_DETAIL_COLUMN = [
  {
    Header: 'Id',
    accessor: 'id',
    isVisible: false
  },
  {
    Header: 'Type',
    accessor: 'type',
    isVisible: false
  },
  {
    Header: 'Severity',
    accessor: 'severity',
    isVisible: false
  },
  {
    Header: 'Kill Chain Phase',
    accessor: 'kill_chain_phase',
    isVisible: false
  },
  {
    Header: 'TimeStamp',
    accessor: 'timestamp',
    isVisible: true
  },
  {
    Header: 'Attacker Id',
    accessor: 'attacker.id',
    isVisible: true
  },
  {
    Header: 'Attacker Ip',
    accessor: 'attacker.ip',
    isVisible: true
  },
  {
    Header: 'Attacker Name',
    accessor: 'attacker.name',
    isVisible: true
  },
  {
    Header: 'Attacker Port',
    accessor: 'attacker.port',
    isVisible: false
  },
  {
    Header: 'Decoy Type',
    accessor: 'decoy.type',
    isVisible: true
  },
  {
    Header: 'Decoy Id',
    accessor: 'decoy.id',
    isVisible: false
  },
  {
    Header: 'Decoy Name',
    accessor: 'decoy.name',
    isVisible: true
  },
  {
    Header: 'Decoy Group',
    accessor: 'decoy.group',
    isVisible: false
  },
  {
    Header: 'Decoy Ip',
    accessor: 'decoy.ip',
    isVisible: false
  },
  {
    Header: 'Decoy Port',
    accessor: 'decoy.port',
    isVisible: false
  },
  {
    Header: '',
    accessor: 'more',
    isVisible: true
  },
]

//use of array only
export const isEmpty = (data: any) => {
  if(data===undefined || data===null || data.length ===0){
    return true
  }
   
  return false
}