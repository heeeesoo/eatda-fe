import RecipeCard from "./RecipeCard"

interface RecipeListType {
    type: string;
}

export default function RecipeList({type} : RecipeListType){

    const overflow_container = type === 'right' ? 'auto' : 'visible'
    const item_wrap = type === 'right' ? 'nowrap' : 'wrap'


    const dummyData = [
        {
            id:1,
            name: '11'
        },
        {
            id:2,
            name: '22'
        },
        {
            id:3,
            name: '33'
        },
        {
            id:4,
            name: '44'
        },
        {
            id:5,
            name: '55'
        },
        {
            id:6,
            name: '66'
        },
    ]

    return(
        <>
        <div className="container">
            <div className="item">
            {
                dummyData.map((data,idx)=>{
                    return(
                        <RecipeCard
                        key={idx}
                        type={type}
                        />
                    )
                })
            }
            </div>
        </div>
        <style jsx>{`
            .container {
                display: flex;
                flex-direction: column;
                
                height: auto;
                margin-bottom: 24px;

                overflow: ${overflow_container};
                -ms-overflow-style: none; /* 인터넷 익스플로러 */
                scrollbar-width: none; /* 파이어폭스 */
            }
            .container::-webkit-scrollbar {
                display: none; /* 크롬, 사파리, 오페라, 엣지 */
            }

            .item {
                display: flex;
                flex-wrap: ${item_wrap};
                width: auto;

                overflow: auto;
                -ms-overflow-style: none; /* 인터넷 익스플로러 */
                scrollbar-width: none; /* 파이어폭스 */
            }
            .item::-webkit-scrollbar {
                display: none; /* 크롬, 사파리, 오페라, 엣지 */
            }
        `}</style>
        </>
    )
}