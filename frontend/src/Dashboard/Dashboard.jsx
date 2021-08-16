import React, { useEffect } from 'react';
import './style.scss';

function Dashboard(props) {
    const report = props.report;

    return (
        <div className="dashboard-wrapper">
            <div className="heading-wrapper">
                <h2>Dashboard</h2>
            </div>
            {report && report.report &&
            <div className="report-wrapper">
                {report.report.aggregate &&
                    <div className="aggregate-report">
                        <div className="box first">
                            <div className="text">
                                <span>{report.report.aggregate.total}</span>
                            </div>
                            <div className="label">
                                <span>Doubts Asked</span>
                            </div>
                        </div>
                        <div className="box">
                            <div className="text">
                                <span>{report.report.aggregate.resolved}</span>
                            </div>
                            <div className="label">
                                <span>Doubts Resolved</span>
                            </div>
                        </div>
                        <div className="box">
                            <div className="text">
                                <span>{report.report.aggregate.escalated}</span>
                            </div>
                            <div className="label">
                                <span>Doubts Escalated</span>
                            </div>
                        </div>
                        <div className="box last">
                            <div className="text">
                                <span>{Math.ceil(report.report.aggregate.averageResolutionTime) + ' min'}</span>
                            </div>
                            <div className="label">
                                <span>Avg. Doubt Resolution Time</span>
                            </div>
                        </div>
                    </div>
                }
                { report.report.taReport &&
                    <div className="ta-report">
                        <label> TAs Report </label>
                        <ul className="ta-list">
                            { report.report.taReport.map((ta, index) => {
                                return (
                                    <div className={"ta-holder" + ( index === report.report.taReport.length -1 ? " last" : "" )}>
                                        <div className="name-holder">
                                            <span>{ ta.firstName + " " + ta.lastName }</span>
                                        </div>
                                        <div className="detailed-report">
                                            <span>Doubts Accepted: {ta.accepted} </span>
                                            <span className="divider"></span>
                                            <span> Doubts Escalated: {ta.escalated} </span>
                                            <span className="divider"></span>
                                            <span> Doubts Resolved: {ta.answered} </span>
                                            <span className="divider"></span>
                                            <span> Avg Doubt Activity Time: {ta.averageDoubtActivityTime.toFixed(2)} min</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                }
            </div>
            }
        </div>
    );
}

export { Dashboard };