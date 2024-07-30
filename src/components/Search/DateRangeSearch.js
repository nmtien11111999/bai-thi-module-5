import { useState } from "react";

// Hàm chuyển đổi ngày từ yyyy-mm-dd sang dd/mm/yy
const formatDateToDDMMYY = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year.slice(2)}`;
};

function DateRangeSearch({ onSearch }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearch = () => {
        const formattedStartDate = startDate ? formatDateToDDMMYY(startDate) : "";
        const formattedEndDate = endDate ? formatDateToDDMMYY(endDate) : "";
        onSearch({ startDate: formattedStartDate, endDate: formattedEndDate });
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
