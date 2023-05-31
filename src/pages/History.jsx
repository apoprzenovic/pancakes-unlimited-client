import react from "react";
import {Button, Card} from "flowbite-react";

function History() {
    return (
        <div className="flex flex-col items-center justify-center pt-20">
            <div className={"flex w-9/12 bg-main-background items-center justify-center m-auto container"}>
                <Card>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>
                            Noteworthy technology acquisitions 2021
                        </p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                            chronological
                            order.
                    </p>
                    <Button className={"bg-main-color"}>
                        <p className={"!text-main-text-black text-xl"}>
                            Read more
                        </p>
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default History;
