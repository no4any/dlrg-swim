import { ReactElement } from "react";

export default function ContentArea({children}:{children: ReactElement | string}) {
    return <nav className="mx-auto p-2 lg:max-w-[1280px] md:max-w-[720px] rounded-sm bg-white/35 backdrop-invert backdrop-opacity-10">
        {children}
    </nav>
}