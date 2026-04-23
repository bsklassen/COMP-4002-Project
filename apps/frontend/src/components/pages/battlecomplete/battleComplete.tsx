import './battleComplete.css'
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDroppedItems } from "../../../hooks/useDroppedItems";
import { advanceFight } from '../../../services/battleService';
import { removeUserItem } from '../../../apis/itemApi';
import { useUser } from '../../common/usercontext/UserContext';

function BattleComplete() {
    // placeholder data
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useUser();
    const enemyName = (location.state as { enemyName?: string } | null)?.enemyName ?? "Enemy";
    const experienceGained = 150
    const goldEarned = 312980
        const { itemsDiscarded, setItemsDiscarded, 
            selectedItems, setSelectedItems, 
            discardConfirmation, setDiscardConfirmation,
            itemsKept, setItemsKept,
            itemsDropped, setItemsDropped
        } = useDroppedItems(userId ?? null);

    const isItemSelected = (itemId: number) => {
        return selectedItems.filter(selectedItem => selectedItem.id === itemId).length > 0
    }

    useEffect(() => {
        if (userId) void advanceFight(userId);
    }, [userId]);
    
    return(
        <div className="postBattleOverlay">
                                        
            <div className="postBattleModal">
                {/* <h1>{victoryAchieved ? "VICTORY!" : "DEFEAT"}</h1> */}
                {/*border - i realize now i should make a component for this - will do if i have time*/ }
                <img src="/images/assets/borders/tl-border-32px.png" alt="" style={{position:'absolute', top: 0, left: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />
                <img src="/images/assets/borders/tr-border-32px.png" alt="" style={{position:'absolute', top: 0, right: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />
                <img src="/images/assets/borders/bl-border-32px.png" alt="" style={{position:'absolute', bottom: 0, left: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />
                <img src="/images/assets/borders/br-border-32px.png" alt="" style={{position:'absolute', bottom: 0, right: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />

                <div style={{position:'absolute', top: 0, left: 32, right: 32, height: 32, backgroundImage: "url('/images/assets/borders/top-border-32px.png')", backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
                <div style={{position:'absolute', bottom: 0, left: 32, right: 32, height: 32, backgroundImage: "url('/images/assets/borders/bot-border-32px.png')", backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
                <div style={{position:'absolute', left: 0, top: 32, bottom: 32, width: 32, backgroundImage: "url('/images/assets/borders/left-border-32px.png')", backgroundRepeat: 'repeat-y', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
                <div style={{position:'absolute', right: 0, top: 32, bottom: 32, width: 32, backgroundImage: "url('/images/assets/borders/right-border-32px.png')", backgroundRepeat: 'repeat-y', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
                <h1>VICTORY!</h1>
                <p>You defeated {enemyName}!</p>
                <p>Experience gained: {experienceGained}</p>
                <p>Gold Earned: {goldEarned}</p>
                <div>
                    <h3>Items Dropped</h3>
                    <br></br>
                   <ul>
                        {
                            itemsDropped.map((items) => {

                                return(
                                    <li key={items.id}
                                     className={isItemSelected(items.id) ? "selected" : ""}
                                        onClick={() => {
                                            if(isItemSelected(items.id)){
                                                setSelectedItems(oldList => oldList.filter(filteredItems => filteredItems.id != items.id));
                                            } else {
                                                setSelectedItems(oldItems => [...oldItems, items])
                                            }
                                        }}
                                    >
                                        {items.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {!itemsKept && (
                        <p>Select the ones you'd like to discard.</p>
                    )}
                    <br></br>
                    {!discardConfirmation && !itemsKept && (
                        <button onClick={() =>{
                            setDiscardConfirmation(true)
                            let uselessVar = itemsDiscarded
                            uselessVar = uselessVar
                        }}>
                            Discard Items
                        </button>
                    )}
                    {discardConfirmation && (
                        <div>
                            <h3>Are you sure you want to discard these items?</h3>
                            <ul>
                                {selectedItems.map((itemsDiscard) => {
                                    return(
                                        <li key = {itemsDiscard.id}>
                                            {itemsDiscard.name}
                                        </li>
                                    );
                                })}
                            </ul>
                            <button onClick={() => {
                                    setItemsDiscarded(oldItems => [...oldItems, ...selectedItems])
                                    setItemsDropped(oldList =>
                                        oldList.filter(item => !isItemSelected(item.id))
                                    )
                                    // Remove discarded items from DB inventory
                                    if (userId) {
                                        selectedItems.forEach((item) => {
                                            void removeUserItem(userId, item.id);
                                        });
                                    }
                                    setSelectedItems([])
                                    setItemsKept(true)
                                    setDiscardConfirmation(false)
                                    
                                }}>
                                    Confirm
                                </button>
                                <button onClick={() => {
                                    setDiscardConfirmation(false)
                                }}>
                                    Cancel
                                </button>
                             
                    </div>
                    )}

                    {itemsKept &&(
                        <div>
                            <p className='baggedGoods'>You drop the items and safely tuck the kept ones into your bag.</p>
                            <p className='baggedGoods'>Best be on your way.</p>
                        </div>
                    )}
                    <button className="continueButton" onClick={() => navigate('/battle', { state: { resetKey: Date.now() } })}>continue</button>
                </div>
            </div>
        </div>
    );
}

export default BattleComplete