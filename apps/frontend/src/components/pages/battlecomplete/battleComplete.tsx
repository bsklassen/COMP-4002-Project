import './battleComplete.css'
import { useNavigate } from 'react-router-dom';
import { useDroppedItems } from "../../../hooks/useDroppedItems";

function BattleComplete() {
    // placeholder data
    const navigate = useNavigate();
    const experienceGained = 150
    const goldEarned = 312980
        const { itemsDiscarded, setItemsDiscarded, 
            selectedItems, setSelectedItems, 
            discardConfirmation, setDiscardConfirmation,
            itemsKept, setItemsKept,
            itemsDropped, setItemsDropped
        } = useDroppedItems();

    const isItemSelected = (itemId: number) => {
        return selectedItems.filter(selectedItem => selectedItem.id === itemId).length > 0
    }
    
    return(
        <div className="postBattleOverlay">
            <div className="postBattleModal">
                {/* <h1>{victoryAchieved ? "VICTORY!" : "DEFEAT"}</h1> */}
                <h1>VICTORY!</h1>
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
                    <p>Select the ones you'd like to discard.</p>
                    <br></br>
                    <button onClick={() =>{
                        setDiscardConfirmation(true)
                        // useless variable for fixing vercel deployment
                        let uselessVar = itemsDiscarded
                        uselessVar = uselessVar
                    }}>
                        Discard Items
                    </button>
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
                    <button className="continueButton" onClick={() => navigate('/battle')}>continue</button>
                </div>
            </div>
        </div>
    );
}

export default BattleComplete