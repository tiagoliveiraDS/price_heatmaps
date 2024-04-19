'use client';

import 'leaflet/dist/leaflet.css';

import dynamic from 'next/dynamic'
 
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {ssr: false})

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {ssr: false})

import { HeatmapLayerFactory } from '@vgrid/react-leaflet-heatmap-layer';

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

export default function Map() {
  //let position = L.latLng(41.146667, -8.604596);

  return (
    <>
      <MapContainer
          center={[41.146667, -8.604596]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
      >
        <HeatmapLayer
            points={[[41.225877413586296, -8.54490180813776, 656283],
              [41.18796732068203, -8.570771722074847, 620442],
              [41.1481939743657, -8.612694055339583, 362020],
              [41.17982731219107, -8.59303235691481, 931340],
              [41.155661014293646, -8.609927058513952, 940013],
              [41.161503206276315, -8.629698658046166, 527824],
              [41.16946687431455, -8.62160110665988, 902757],
              [41.16187161269144, -8.623921053009518, 665670],
              [41.14756850399634, -8.63178846509031, 623931],
              [41.16470221908304, -8.642706561271347, 731288],
              [41.15716359609545, -8.64633263186208, 352856],
              [41.15988504212696, -8.611768849261504, 778930],
              [41.16991492526226, -8.614007306146375, 114973],
              [41.16100430508575, -8.636162579209808, 731349],
              [41.15098651569512, -8.61481070703183, 425823]
 ,             [41.14513805597959, -8.631278564630575, 687246]
,              [41.143029297853295, -8.64036596522924, 575606]
,              [41.1427853014636, -8.626987993719234, 677071]
 ,             [41.15645130701332, -8.64382970113122, 412311]
 ,             [41.16538425272429, -8.636587097579145, 858320]
,              [41.15266948515187, -8.6087454737435, 778919]
 ,             [41.1504634620669, -8.617190166290152, 320918]
 ,             [41.16633408001809, -8.646366579677914, 682402]
,              [41.145025103140084, -8.624101589512254, 203669],
              [41.15173274997124, -8.64204876510878, 552777]
 ,             [41.15833008535699, -8.619856892611923, 733885]
,              [41.16143907976553, -8.637388812357106, 887393]
,              [41.15689614400406, -8.620164722292834, 384904]
,              [41.16441344649301, -8.632297271286092, 620471]
,              [41.16694240563168, -8.614531041259915, 153463]
,              [41.15833332100707, -8.620398590389976, 118684]
,              [41.15959752970195, -8.622284744166565, 487135]
,              [41.173871825722124, -8.609207888940988, 185871],
              [41.16363560789838, -8.633594295259046, 638762]
,              [41.15527305820327, -8.626900857394865, 233429]
,              [41.16755310233316, -8.615453131820326, 748354]
,              [41.16679908557898, -8.617996513772224, 649159]
,              [41.17323317682291, -8.629220810481356, 794676]
,              [41.15802810410038, -8.628698207378264, 881460]
,              [41.16634785487679, -8.641100292416476, 172589]
,              [41.1514762165162, -8.61123282778525, 979903]
 ,             [41.14456050487918, -8.627031579174758, 221793]
,              [41.16248453684703, -8.608178204873497, 728895]
,              [41.15082986073515, -8.61337033636465, 913682]
 ,             [41.1541813457811, -8.615991221342165, 539804]
 ,             [41.14829934377787, -8.61830742510584, 451307]
 ,             [41.15455457834819, -8.638292161706054, 872981]
,              [41.16288031534431, -8.636945431141727, 702514]
,              [41.15644185032473, -8.630054663491473, 846908]
,              [41.15112100700911, -8.620868439607853, 676393]
,              [41.15110893310214, -8.623228454241716, 473044]
,              [41.1457032861815, -8.63250636371572, 289565]
 ,             [41.14689719667613, -8.63728207381517, 522021]
 ,             [41.16166361928218, -8.617417103602105, 564469]
,              [41.15627694822734, -8.62578537211249, 912804]
 ,             [41.164974782520015, -8.624463406308445, 537508],
              [41.16550842196772, -8.637670276117486, 872383]
,              [41.15948817643207, -8.630059574248693, 979671]
,              [41.16078474137948, -8.623051144020195, 905057]
,              [41.170331481007784, -8.638565206832815, 293112],
              [41.16839371100888, -8.635373907682234, 830025]
,              [41.154977304237384, -8.61581994975436, 231890]
,              [41.16153537335806, -8.629186748060253, 255970]
,              [41.15204236515527, -8.610263245057848, 356038]
,              [41.16744510159561, -8.629744134014683, 780412]
,              [41.15498637968109, -8.630943881469113, 226044]
,              [41.15667136477535, -8.621893670229636, 140746]
,              [41.16346045854846, -8.628454396107425, 934453]
,              [41.15296597087643, -8.630162541184582, 408248]
,              [41.14795567890071, -8.618168233878043, 579537]
,              [41.16597319183956, -8.625802294273467, 912501]
,              [41.15393835402177, -8.630786313826646, 976358]
,              [41.14778104449994, -8.615940374253157, 156301]
,              [41.16445660699932, -8.634621488238477, 332484]
,              [41.15354716918704, -8.613689827665586, 924863]
,              [41.150830533540656, -8.631203749138098, 904188],
              [41.15726806418281, -8.625107077703935, 809861]
,              [41.16322103522271, -8.635875522890368, 101857]
,              [41.16431017449254, -8.629287414554818, 856084]
,              [41.16734592092588, -8.633168535598556, 418241]
,              [41.15414326104937, -8.626071712079186, 548545]
,              [41.16165490355641, -8.61225941354875, 454032]
 ,             [41.16249650531374, -8.619464671742886, 153375]
,              [41.15874619564655, -8.630021848917902, 989989]
,              [41.15486920303755, -8.615236666760276, 837683]
,              [41.169845249778345, -8.63685968986766, 789325]
,              [41.14861143842864, -8.631476899536768, 127161]
,              [41.15543188760679, -8.620708903869484, 636124]
,              [41.16923433322735, -8.625765083603824, 314593]
,              [41.15014675867892, -8.625709801769888, 387133]
,              [41.15330950530444, -8.62588925718926, 931431]
 ,             [41.16301396410171, -8.627117201890578, 106404]
,              [41.15259734842266, -8.61213750989324, 111229]
 ,             [41.160256764441255, -8.618016434720365, 320242],
              [41.15592480926874, -8.625104875756626, 816109]
,              [41.15307268382264, -8.612756513116998, 794240]
,              [41.158688518433025, -8.618491878170286, 675339],
              [41.16953865428148, -8.619209426843897, 309572]
,              [41.16245521574648, -8.617873298789203, 702129]
,              [41.1597980308082, -8.624512020536127, 972182]
 ,             [41.15000576019757, -8.63663864792437, 212647]
 ,             [41.15009912398692, -8.624375854917224, 671074]
,              [41.15927505606305, -8.621240135285257, 315506]
,              [41.15729866369882, -8.621344847502258, 858861]
,              [41.15011066389315, -8.62347757246014, 545268]
 ,             [41.16852847764832, -8.62326194847798, 115126]
 ,             [41.168565736754306, -8.640139763207686, 446293],
              [41.15293174690646, -8.636575248147326, 304400]
,              [41.15832506110185, -8.62782557514877, 411009]
 ,             [41.16499343927501, -8.622229153451476, 694263]
,              [41.15072402682369, -8.630327776775244, 457000]
,              [41.16769822418522, -8.632206152563912, 742002]
,              [41.16287820902592, -8.636221563467287, 648133]
,              [41.15085820751298, -8.625739227587172, 418888]
,              [41.15920869511702, -8.621548774654992, 530393]
,              [41.15313066905916, -8.631856348543212, 487991]
,              [41.15954022080407, -8.614158126683732, 359657]
,              [41.16736545811396, -8.621505662434004, 220284]
,              [41.15520482985419, -8.62537068908076, 612101]
 ,             [41.15228399977808, -8.613063725132482, 542027]
,              [41.16205561819685, -8.630304183119998, 458185]
,              ]}
            longitudeExtractor={(p) => p[1]}
            latitudeExtractor={(p) => p[0]}
            intensityExtractor={(p) => p[2]}
            max = {1000000}
            radius={20}
        />
        <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}