import React from 'react'
import "./Store.css";

const DeliveryService = () => {
    return (
        <>
            <div className='pb-4'>
                <h4>🌱 배송안내</h4>
                <div className='select_box pt-4' style={{ background: "#adadad2b" }}>
                    <ul>
                        <li>- 플랜티 배송 : 2만원 이상 구매 시 무료배송/ 2만원 미만 구매 시 배송비 2,500원</li>
                        <li>- 브랜드별 배송 : 브랜드 정책에 따라 무료배송 혹은 배송비 부과 (상품상세정보에서 배송비 기준 확인가능)</li>
                    </ul>
                    <ul>
                        <h5>배송비</h5>
                        <li>- 도서, 산간, 오지, 일부지역, 설치배송 상품 등은 배송비가 추가될 수 있습니다.</li>
                        <li>- 무료배송 상품과 함께 구입 시, 기준금액 미만으로 구입하시더라도 해당 브랜드 상품은 무료배송 됩니다.</li>
                        <li>- 플랜티 배송과 브랜드 개별 배송비는 별도로 부과 됩니다.</li>
                    </ul>
                    <ul>
                        <h5>배송기간 및 방법</h5>
                        <li>- 결제 완료 후, 1~5일 이내에 배송 됩니다. (단, 상품의 재고 상황이나 배송 상황, 지역특성에 따라 배송이 지연될 수 있습니다.)</li>
                    </ul>
                </div>
            </div>

            <div className='pb-4'>
                <h4>🌱 반품/교환 안내</h4>
                <div className='select_box pt-4' style={{ background: "#adadad2b" }}>
                    <ul>
                        <li>- 상품 설명에 반품/교환 관련 안내가 있는 경우 그 내용을 우선으로 합니다. (업체 사정에 따라 변경 될 수 있습니다.)</li>
                    </ul>
                    <ul>
                        <h5>반품/교환 가능기간</h5>
                        <li>- 변심반품의 경우 수령 후 7일 이내, 상품의 결함 및 계약내용과 다를 경우 문제점 발견 후 30일 이내</li>
                        <li>- 상품불량 및 오배송 등의 이유로 반품/교환을 하실 경우 반품/교환비는 무료 입니다. (단, 판매자가 반품된 상품 확인 후 상품불량이 아닌 것으로 확인 될 시 반송비를 고객님께 부과할 수 있습니다.)</li>
                        <li>- 고객변심으로 인한 교환/반품의 배송비는 고객님 부담 입니다.</li>
                        <li>- 고객변심으로 인한 교환/반품 시 주문에 사용된 할인쿠폰은 반환되지 않습니다.</li>
                    </ul>
                    <ul>
                        <h5>반품/교환 불가사유</h5>
                        <li>- 반품/교환 가능 기간을 초과한 경우</li>
                        <li>- 소비자의 책임 있는 사유로 상품 등이 손실 또는 훼손된 경우 (단지 확인을 위한 포장 훼손은 제외)</li>
                        <li>- 소비자의 사용, 포장 개봉에 의해 상품 등의 가치가 현저히 감소한 경우 (예: 밀봉상품, 기타 사용/분리/훼손)</li>
                        <li>- 소비자의 요청에 따라 개별적으로 주문 제작되는 상품의 경우</li>
                        <li>- 시간의 경과에 의해 재판매가 곤란한 정도로 가치가 현저히 감소한 경우</li>
                        <li>- 전자상거래 등에서의 소비자보호에 관한 법률이 정하는 소비자 청약철회 제한 내용에 해당되는 경우</li>
                    </ul>
                </div>
            </div>

            <div className='pb-4'>
                <h4>🌱 기타사항</h4>
                <div className='select_box pt-4' style={{ background: "#adadad2b" }}>
                    <ul>
                        <li>- 상품의 불량에 의한 교환, A/S, 환불, 품질보증 및 피해보상 등에 관한 사항은 소비자분쟁해결 기준 (공정거래위원회 고시)에 준하여 처리됨</li>
                        <li>- 대금 환불 및 환불지연에 따른 배상금 지급 조건, 절차 등은 전자상거래 등에서의 소비자 보호에 관한 법률에 따라 처리함</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DeliveryService