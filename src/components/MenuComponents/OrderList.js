import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListOrder } from "../../services/OrderService/OrderAxios";
import { ListProduct } from "../../services/ProductService/ProductAxios";
import DateRangeSearch from "../Search/DateRangeSearch";
import TopOrdersSearch from "../Search/TopOrdersSearch";
import { ThreeDots } from "react-loader-spinner";
import { format } from "date-fns";
import PageOrder from "../../pages/PageOrder/PageOrder";
import { Link } from "react-router-dom";

function OrderList() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const products = useSelector((state) => state.products.products);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [loading, setLoading] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(ListOrder())
            .then(() => dispatch(ListProduct()))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        setFilteredOrders(orders);
    }, [orders]);

    const handleSearchByDateRange = ({ startDate, endDate }) => {
        const filtered = orders.filter(order => {
            const orderDate = new Date(order.purchaseDate);
            return (
                (!startDate || orderDate >= new Date(startDate)) &&
                (!endDate || orderDate <= new Date(endDate))
            );
        });
        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to the first page
        setIsSearching(true);
    };

    const handleSearchTopOrders = ({ topN }) => {
        if (topN > 0) {
            const sortedOrders = [...orders]
                .sort((a, b) => b.totalPrice - a.totalPrice)
                .slice(0, topN);
            setFilteredOrders(sortedOrders);
            setCurrentPage(1); // Reset to the first page
            setIsSearching(true);
        }
    };

    const handleResetSearch = () => {
        setFilteredOrders(orders);
        setCurrentPage(1);
        setIsSearching(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Danh sách đơn hàng</h1>

            <div className="mb-3 d-flex justify-content-between">
                <DateRangeSearch onSearch={handleSearchByDateRange} />
                <TopOrdersSearch onSearch={handleSearchTopOrders} />
            </div>

            <div className="d-flex justify-content-between mb-3">
                <div></div>
                <Link to={"/add"} className="btn btn-primary">Thêm đơn hàng</Link>
            </div>

            {isSearching && (
                <div className="mb-3">
                    <button className="btn btn-secondary" onClick={handleResetSearch}>
                        Quay lại danh sách đầu tiên
                    </button>
                </div>
            )}

            {loading ? (
                <div className="d-flex justify-content-center">
                    <ThreeDots color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                <div className="table-responsive mt-4">
                    {currentItems.length === 0 ? (
                        <div className="text-center">
                            <p>No results found.</p>
                        </div>
                    ) : (
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã đơn hàng</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Loại sản phẩm</th>
                                <th scope="col">Ngày mua</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền (USD)</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((order, index) => {
                                const product = products.find(p => p.id === order.productId);
                                const price = product?.price ? Number(product.price) : 0;
                                const totalPrice = order.totalPrice ? Number(order.totalPrice) : 0;
                                return (
                                    <tr key={order.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{order.id}</td>
                                        <td>{product?.name}</td>
                                        <td>{formatter.format(price)}</td>
                                        <td>{product?.category}</td>
                                        <td>{format(new Date(order.purchaseDate), 'dd-MM-yyyy')}</td>
                                        <td>{order.quantity}</td>
                                        <td>{formatter.format(totalPrice)}</td>
                                        <button>Sửa</button>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            <div className="d-flex justify-content-center mt-4">
                <PageOrder
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default OrderList;
