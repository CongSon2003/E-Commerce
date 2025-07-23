import { Breadcrumb } from "component";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
const Typography = () => {
  return (
    <div className="w-full flex flex-col gap-5 font-[Poppins]">
      <Breadcrumb title={"Typography"} pages={"Typography"} />
      <div className="w-full bg-white flex justify-center text-[#505050] pb-5">
        <div className="w-main flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-2xl font-semibold">HEADING</span>
              <h1 className="text-2xl font-semibold mb-[12px] mt-[20px]">
                H1 Heading
              </h1>
              <h2 className="text-xl font-semibold mb-[10px]">H2 Heading</h2>
              <h3 className="text-lg font-medium mb-[9px]">H3 Heading</h3>
              <h4 className="text-base mb-[8px]">H4 Heading</h4>
              <h5 className="text-xs mb-[6px]">H5 Heading</h5>
            </div>
            <div>
              <span className="text-2xl font-semibold block mb-5">COLUMN</span>
              <div className="grid grid-cols-6 grid-rows-3 text-sm">
                <p className="col-span-6 row-span-1">
                  orem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  nulla leo, gravida nec iaculis at, ullamcorper vitae libero.
                  Proin vel felis dolor. Mauris nec ornare arcu. Pellentesque
                  ultrices, magna vitae rhoncus volutpat, mi est ultricies
                  lectus, ac interdum mauris arcu scelerisque nunc. Quisque
                  euismod lacus quis ex mollis, ut elementum metus tincidunt.
                  Quisque egestas laoreet quam in convallis. Cras quis feugiat
                  massa. Aliquam nibh felis, tristique quis viverra et, finibus
                  ac leo. Donec egestas quam ligula, vulputate interdum erat
                  pharetra non. Cras commodo nisl ut elit tristique, in dapibus
                  ante rhoncus. Ut blandit consectetur volutpat. Aliquam sit
                  amet elementum odio.
                </p>
                <p className="col-span-4 row-span-1">
                  Nullam ultricies consectetur suscipit. Pellentesque gravida,
                  orci eu pharetra tempor, sem ante iaculis orci, et vehicula
                  urna orci varius tellus. Curabitur lectus libero, porta ac
                  neque vel, cursus gravida est. Sed accumsan lacus non dui
                  accumsan, in lobortis sem efficitur. Maecenas ut est in nulla
                  vulputate suscipit vestibulum sit amet diam. Vivamus dapibus
                  metus non ex egestas, sed laoreet nibh.
                </p>
                <p className="col-span-2 row-span-1 ">
                  Nullam ultricies consectetur suscipit. Pellentesque gravida,
                  orci eu pharetra tempor, sem ante iaculis orci, et vehicula
                  urna orci varius tellus. Curabitur lectus libero, porta ac
                  neque vel, cursus gravida est.
                </p>
                <p className="col-span-3 row-span-1">
                  Nullam ultricies consectetur suscipit. Pellentesque gravida,
                  orci eu pharetra tempor, sem ante iaculis orci, et vehicula
                  urna orci varius tellus. Curabitur lectus libero, porta ac
                  neque vel, cursus gravida est. Sed accumsan lacus non dui
                  accumsan, in lobortis sem efficitur. Maecenas ut est in nulla
                  vulputate suscipit vestibulum sit amet diam. Vivamus dapibus
                  metus non ex egestas, sed laoreet nibh.
                </p>
                <p className="col-span-3 row-span-1 pl-5">
                  Nullam ultricies consectetur suscipit. Pellentesque gravida,
                  orci eu pharetra tempor, sem ante iaculis orci, et vehicula
                  urna orci varius tellus. Curabitur lectus libero, porta ac
                  neque vel, cursus gravida est. Sed accumsan lacus non dui
                  accumsan, in lobortis sem efficitur. Maecenas ut est in nulla
                  vulputate suscipit vestibulum sit amet diam. Vivamus dapibus
                  metus non ex egestas, sed laoreet nibh.
                </p>
              </div>
            </div>
            <div>
              <span className="text-2xl font-semibold mb-5 block">DROPCAP</span>
              <div className="grid grid-cols-2 text-sm">
                <p className="pl-5 col-span-1">
                  <span className="text-main text-7xl float-left pl-[13px] pr-[17px]">
                    E
                  </span>
                  tiam aliquam facilisis massa, id sagittis mi. Proin sodales
                  metus non dui pretium, non posuere est interdum. Ut a felis
                  sit amet sem luctus iaculis. Sed ultricies pharetra interdum.
                  Proin blandit vitae orci a vehicula. Sed fringilla, est dictum
                  tristique laoreet, dui felis tincidunt erat, vitae ultrices
                  leo odio viverra arcu. Fusce ac bibendum risus. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos. Vestibulum auctor convallis neque et
                  rhoncus. Mauris ac nunc eu tortor scelerisque malesuada.
                </p>
                <p className="pl-5 col-span-1">
                  <span className="py-[20px] box-border px-[15px] text-[50px] relative float-left bg-main text-white mr-3 top-1">
                    E
                  </span>
                  tiam aliquam facilisis massa, id sagittis mi. Proin sodales
                  metus non dui pretium, non posuere est interdum. Ut a felis
                  sit amet sem luctus iaculis. Sed ultricies pharetra interdum.
                  Proin blandit vitae orci a vehicula. Sed fringilla, est dictum
                  tristique laoreet, dui felis tincidunt erat, vitae ultrices
                  leo odio viverra arcu. Fusce ac bibendum risus. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos. Vestibulum auctor convallis neque et
                  rhoncus. Mauris ac nunc eu tortor scelerisque malesuada.
                </p>
              </div>
            </div>
            <div>
              <span className="text-2xl font-semibold mb-5 flex justify-center">
                DROPCAP
              </span>
              <div className="bg-main w-full py-[23px] text-white pr-[60px] grid grid-cols-9">
                <div className="col-span-1 text-right pr-7">
                  <FaQuoteLeft size={24} className="inline-block" />
                </div>
                <p className="col-span-8">
                  Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam
                  rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem
                  quam semper libero, sit amet adipiscing sem neque sed ipsum.
                  Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id,
                  lorem. Nullam quis ante. Etiam sit amet orci eget eros
                  faucibus tincidunt. Morbi aliquet pretium erat eget auctor
                  magna.
                </p>
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold mb-5">ORDER LIST</div>
              <ol className="text-sm">
                <li>
                  <span className="mr-[15px] text-main font-semibold">1.</span>
                  Fusce ut odio accumsan vestibulum orci.
                </li>
                <li>
                  <span className="mr-[15px] text-main font-semibold">2.</span>
                  Phasellus sed dolor sodales, eleifend ipsum eu.
                  <ol className="my-1 ml-5 pl-5">
                    <li>
                      <span className="mr-[15px] text-main font-semibold">
                        2.1
                      </span>
                      Proin fringilla sapien a eros porta
                    </li>
                    <li>
                      <span className="mr-[15px] text-main font-semibold">
                        2.2
                      </span>
                      Lorem ipsum dolor sit amet consectetur
                    </li>
                  </ol>
                </li>
                <li>
                  <span className="mr-[15px] text-main font-semibold">3.</span>
                  Etiam vel tellus sit amet elit ultricies finibus.
                </li>
                <li>
                  <span className="mr-[15px] text-main font-semibold">4.</span>
                  Etiam id lorem vel neque faucibus fermentum.
                </li>
                <li>
                  <span className="mr-[15px] text-main font-semibold">5.</span>
                  Nunc tincidunt augue in enim sollicitudin feugiat.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typography;
