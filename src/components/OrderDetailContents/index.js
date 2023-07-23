import { useParams,useLocation,useNavigate } from 'react-router-dom';
import styles from './style.module.scss'

// component
import { SelectButton, BorderLayoutBox } from 'components';

function OrderDetailContents() {

    const params = useParams();
    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    const nextClick = () => {
        return navigate(`/privacy`,{state : state});
    }

    const frontCount = state.assets && state.assets.length > 0 ? 1 : 0;
    const backCount = state.backAssets && state.backAssets.length > 0? 1 : 0;

    return (
        <div className={styles.OrderDetailWrap}>
            <div className={styles.OrderDetailInner}>
                <div className={styles.DetailTitle}>
                    <h2>상세 주문내역</h2>
                </div>
                <div className={styles.PriceWrapper}>
                    <i className={styles.BorderBox}></i>
                    <i className={styles.BorderBox}></i>
                    <i className={styles.BorderBox}></i>
                    <i className={styles.BorderBox}></i>
                    <div className={styles.PriceBox}>
                        
                        {
                            params.type === "QR" || params.type === "qr" ? 
                            <div className={styles.PriceRow}>
                                <div className={styles.PriceTitleBox}>
                                    <p>PHOTO SCAN PRINTING</p>
                                    <p>포토 스캔 프린팅</p>
                                </div>
                                <div className={styles.Price}><p><span>({(frontCount + backCount) + "면"})</span>{frontCount + backCount > 1 ? " 30,000" : " 15,000"} 원</p></div>
                            </div>
                            :
                            null
                        }
                        {
                            params.type === "print" ? 
                            <div className={styles.PriceRow}>
                                <div className={styles.PriceTitleBox}>
                                    <p>DIGITAL PRINT</p>
                                    <p>디지털 프린트</p>
                                </div>
                                <div className={styles.Price}><p><span>({(frontCount + backCount) + "면"})</span>{frontCount + backCount > 1 ? " 30,000" : " 15,000"} 원</p></div>
                            </div>
                            :
                            null
                        }
                        {
                            params.type === "embroidery" ? 
                            <div className={styles.PriceRow}>
                                <div className={styles.PriceTitleBox}>
                                    <p>EMBROIDERY</p>
                                    <p>자수</p>
                                </div>
                                <div className={styles.Price}><p>3,000 원</p></div>
                            </div>
                            :
                            null
                        }
                        {
                            params.type === "laser_pre" || params.type === "laser" ? 
                            <div className={styles.PriceRow}>
                                <div className={styles.PriceTitleBox}>
                                    <p>HAND JET PRINT</p>
                                    <p>핸드젯 프린트</p>
                                </div>
                                <div className={styles.Price}><p><span>(3회)</span> 3,000 원</p></div>
                            </div>
                            :
                            null
                        }
                        {
                            state.productPrice > 0 ? 
                            <div className={styles.PriceRow}>
                                <div className={styles.PriceTitleBox}>
                                    <p>
                                        {(params.type === "laser" || params.type === "laser_pre") && "ECO BAG"}
                                        {!(params.type === "laser" || params.type === "laser_pre") && "T-SHIRTS"}
                                    </p>
                                    <p>
                                        {(params.type === "laser" || params.type === "laser_pre") && "에코백"}
                                        {!(params.type === "laser" || params.type === "laser_pre") && "티셔츠"}
                                    </p>
                                </div>
                                <div className={styles.Price}><p>{state.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</p></div>
                            </div>
                            :
                            null
                        }
                        {
                            state.optionPrice > 0 ? 
                            <div className={styles.PriceRow}>
                                <div className={styles.PriceTitleBox}>
                                    <p>Option Price</p>
                                    <p>옵션 가격</p>
                                </div>
                                <div className={styles.Price}><p>{state.optionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</p></div>
                            </div>
                            :
                            null
                        }
                        {
                            (params.type !== "embroidery" && params.type !== "QR")  && state.assetPrice > 0 ? 
                            <div className={styles.PriceRow}>
                                <div className={styles.PriceTitleBox}>
                                    <p>Asset Price</p>
                                    <p>에셋 가격</p>
                                </div>
                                <div className={styles.Price}><p>{state.assetPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</p></div>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>

            <div className={styles.TotalPriceBox}>
                <BorderLayoutBox>
                    <div className={styles.PriceTextBox}>
                        <p className={styles.TotalPrice}>총 결제 금액 : <b>{state.totalPrice}원</b></p>
                    </div>
                </BorderLayoutBox>
            </div>

            <SelectButton title="PAY" next={true} link={nextClick}/>
        </div>
    );
}

export default OrderDetailContents;