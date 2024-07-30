import { useState } from "react";

function DateRangeSearch({ onSearch }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearch = () => {
        onSearch({ startDate, endDate });
    };

    return (
        <div className="d-flex align-items-center justify-content-between">
            <div className="me-2">
                <label htmlFor="startDate" className="form-label">Từ ngày</label>
                <input
                    id="startDate"
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="me-2">
                <label htmlFor="endDate" className="form-label">Đến ngày</label>
                <input
                    id="endDate"
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={handleSearch}
            >
                Tìm kiếm theo ngày
            </button>
        </div>
    );
}

export default DateRangeSearch;
