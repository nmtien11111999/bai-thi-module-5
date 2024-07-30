import { useState } from "react";

function TopOrdersSearch({ onSearch }) {
    const [topN, setTopN] = useState(0);

    const handleSearch = () => {
        if (topN > 0) {
            onSearch({ topN });
        }
    };

    return (
        <div className="d-flex align-items-center">
            <div className="me-2">
                <label htmlFor="topOrders" className="form-label">Số lượng đơn hàng hàng đầu</label>
                <input
                    id="topOrders"
                    type="number"
                    className="form-control"
                    value={topN}
                    onChange={(e) => setTopN(Math.max(0, e.target.value))}
                    placeholder="Nhập số lượng"
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={handleSearch}
                style={{marginTop: '30px'}}
            >
                Tìm kiếm
            </button>
        </div>
    );
}

export default TopOrdersSearch;
