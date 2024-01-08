import React, { useEffect, useRef, useState } from 'react'
import UploadError from '../components/UploadError'
import UploadLayout from '../layouts/UploadLayout'
import { Slider, Textarea } from '@nextui-org/react'
import { Pause, PlayCircle, Volume2, VolumeX } from 'lucide-react'

const Upload = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [file, setFile] = useState<File | null>(null)
  const [fileDisplay, setFileDisplay] = useState<string | undefined>(
    undefined
  )

  const [errorType, setErrorType] = useState<string | null>(null)
  const [caption, setCaption] = useState<string>("")
  const [fileData, setFileData] = useState<File | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)
  
  const [currentTime, setCurrentTime] = useState(0);
  const [stop, setStop] = useState(false);
  const [sound, setSound] = useState(true);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // Update current time when video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleTimeUpdate);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleTimeUpdate);
        }
      };
    }
  }, []);

  // Handle slider change
  const handleSliderChange = (value: number | number[]) => {
    const currentTimeValue = Array.isArray(value) ? value[0] : value;
    if (videoRef.current) {
      videoRef.current.currentTime = currentTimeValue;
      setCurrentTime(currentTimeValue);
    }
  };

  const handleVideo = () => {
    setStop(!stop);
    if (videoRef.current !== null) {
      if (stop === true) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileDisplay(URL.createObjectURL(e.target.files[0]))
      setFileData(e.target.files[0])
    }
  }

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    setErrorType(null)
    setFile(e.dataTransfer.files[0])
    // setFileData(e.dataTransfer.files[0])

    const extension = e.dataTransfer.files[0].name.split(".").pop()
    if (extension !== "mp4") {
      setErrorType("file")
      return
    }

    setFileDisplay(URL.createObjectURL(e.dataTransfer.files[0]))
    console.log(fileDisplay)
  }

  const discard = () => {
    setFile(null)
    setFileDisplay(undefined)
    setCaption("")
  }

  const clearVideo = () => {
    setFile(null)
    setFileDisplay(undefined)
  }

  useEffect(() => {
    console.log(caption.length)
    if (caption.length === 150) {
      setErrorType("caption")
      return
    }

    setErrorType(null)
    console.log("caption", errorType)
  }, [errorType, caption])

  return (
    <>
      <UploadError errorType={errorType} />
      <UploadLayout>
        <div className="w-full mt-2 mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <div className="text-[23px] font-semibold">Upload video</div>
            <div className="text-gray-400 mt-1">
              Post a video to your account
            </div>
          </div>
          <div className="mt-8 md:flex gap-6">
            {!fileDisplay ? (
              <label
                onDragOver={(e) => {
                  e.preventDefault() // Prevent default behavior on drag over
                }}
                onDragEnter={(e) => {
                  e.preventDefault()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  onDrop(e)
                  console.log("drop")
                }}
                htmlFor="fileInput"
                className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full  h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                {/* <FiUploadCloud size="50" color="#b3b3b1" /> */}
                <div className="mt-4 text-[17px]">Select a video to upload</div>
                <div className="mt-1.5 text-gray-500 text-[13px]">
                  Or drag and drop a file
                </div>
                <div className="mt-12 text-gray-400 text-sm">MP4</div>
                <div className="mt-2 text-gray-400 text-[13px]">
                  Up to 30 minutes
                </div>
                <div className="mt-2 text-gray-400 text-[13px]">
                  Less than 2 GB
                </div>
                <div className="px-2 py-1.5 mt-8 text-white text-[15px] w-80% bg-[#F02C56] rounded-sm">
                  Select file
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept=".mp4"
                  onChange={(e) => handleFileChange(e)}
                />
              </label>
            ) : (
              <>
                <div className="md:mx-0 bg-white mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[320px] h-[600px] p-3 rounded-2xl cursor-pointer relative">
                  <img
                    className="absolute z-20 pointer-events-none h-[600px]"
                    src="https://cdn.discordapp.com/attachments/757941239495655464/1193521943295569920/Apple-iPhone-15-Frame-PNG.png?ex=65ad04ed&is=659a8fed&hm=eb5d7ce98743095c125e4d8ca9e48b2484f5969318338864fa5b9f79fbc7b79a&"
                  />
                  <div className=" absolute z-40 bottom-8 w-[68%] ">
                    <div className="flex justify-between pb-1">
                      {!stop ? <PlayCircle color='white' size={20} onClick={handleVideo} /> : <Pause color='white' size={17} onClick={handleVideo} />}
                      <p className="text-white font-medium text-small">{formatTime(currentTime)} / {formatTime(videoRef.current?.duration || 0)}</p>
                      {!sound ? <Volume2 color='white' size={20} onClick={() => setSound(!sound)} /> : <VolumeX color='white' size={20} onClick={() => setSound(!sound)} />}
                    </div>
                    <Slider
                      size="sm"
                      minValue={0}
                      maxValue={videoRef.current?.duration}
                      value={currentTime}
                      aria-label="Temperature"
                      hideThumb={true}
                      className="max-w-md"
                      classNames={{
                        base: "max-w-md gap-3",
                        filler: "bg-white",
                      }}
                      onChange={handleSliderChange}
                    />
                  </div>
                  <video
                    id='video-player'
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={sound}
                    className="absolute rounded-xl object-cover z-10  w-full max-w-[268px] py-1 h-full top-0"
                    src={fileDisplay}
                    onTimeUpdate={handleTimeUpdate}
                  />

                  <div className="absolute -bottom-12 flex items-center justify-between border-gray-300 w-full p-2 border rounded-xl z-50  ">
                    <div className="flex items-between truncate">
                      {/* <IoCheckmarkDoneCircleOutline
                        size="16"
                        className="min-w-[16px]"
                      /> */}
                      <div className="text-[11px] pl-1 truncate text-ellipsis">
                        {fileData?.name}
                      </div>
                    </div>
                    {/* <button
                      onClick={clearVideo}
                      className="text-[11px] ml-4 font-semibold"
                    >
                      Change
                    </button> */}
                  </div>
                </div>
                <div className="mt-4 mb-6">
                  <div className="flex bg-[#F8F8F8] py-4 px-6">
                    {/* <GiBoxCutter className="mr-4" size="20" /> */}

                    <div>
                      <div className="text-semibold text-[15px] mb-1.5">
                        Devide videos and edit
                      </div>
                      <div className="text-semibold text-[13px] text-gray-400">
                        You can quickly devide videos into multiple clips and
                        edit them.
                      </div>
                    </div>
                    <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                      <button className="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <div className="mb-1 text-[15px]"></div>

                    </div>
                    <Textarea
                      label="Caption"
                      labelPlacement="outside"
                      placeholder="Enter your Caption"
                      className="w-full"
                      endContent={
                        <div className="text-gray-400 text-[12px]">
                          {caption.length}/150
                        </div>}
                      maxLength={150}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    {/* <button
                      onClick={discard}
                      className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleCreatePost}
                      className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm"
                    >
                      Post
                    </button> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </UploadLayout>
    </>
  )
}

export default Upload