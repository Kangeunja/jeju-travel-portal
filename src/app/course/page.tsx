"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CourseDetailPage() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTokenReceived, setIsFirstTokenReceived] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState("");

  const handleGenerateCourse = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!keyword.trim() || isLoading) return;

    setIsLoading(true);
    setIsFirstTokenReceived(false);
    setGeneratedCourse("");

    try {
      const response = await fetch("/api/course-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: keyword }),
      });

      if (!response.ok || !response.body) {
        throw new Error("스트리밍 응답을 가져오지 못했습니다.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          console.log(value);
          const chunkValue = decoder.decode(value, { stream: true });
          console.log(chunkValue);
          const lines = chunkValue.split("\n\n");
          console.log(lines);

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith("data:")) {
              const dataStr = trimmedLine.replace(/^data:\s*/, "");
              console.log(dataStr);
              if (dataStr === "[DONE]") break;

              try {
                const parsed = JSON.parse(dataStr);
                console.log(parsed);
                if (parsed.text) {
                  setIsFirstTokenReceived(true);
                  setGeneratedCourse((prev) => prev + parsed.text);
                }
              } catch (error) {
                console.error("JSON 파싱 에러:", error);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to data", error);
      setGeneratedCourse(
        "코스를 생성하는 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI 맞춤 제주 여행 코스 추천
        </h1>
        <p className="text-gray-600">
          원하시는 여행 스타일, 일정, 동반자 정보를 자유롭게 입력해 보세요.
        </p>
      </div>

      <form className="mb-8" onSubmit={handleGenerateCourse}>
        <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="예: 아이 2명 포함 2박 3일 서귀포 맛집 위주 코스 추천해줘"
            className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !keyword.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center min-w-[120px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>생성 중...</span>
              </div>
            ) : (
              "AI 코스 생성"
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mb-8 items-center text-sm text-gray-500">
        <span className="font-semibold text-gray-700">추천 키워드:</span>
        {[
          "우도 포함 1박 2일",
          "부모님 모시고 3박 4일 힐링",
          "혼자 떠나는 제주 서부 카페 투어",
        ].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setKeyword(tag);
            }}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 flex items-center justify-between">
          <span> 추천 일정 및 코스</span>
          {isLoading && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-normal animate-pulse">
              ● AI가 실시간으로 일정을 작성 중입니다
            </span>
          )}
        </h2>

        {!isLoading && !generatedCourse && (
          <div className="text-center py-16 text-gray-400">
            상단 검색바에 키워드를 입력하고{" "}
            <span className="font-semibold text-gray-600">[AI 코스 생성]</span>{" "}
            버튼을 눌러보세요.
          </div>
        )}

        {/* {isLoading && !isFirstTokenReceived && (
          <div className="text-gray-500 text-sm py-8 text-center animate-pulse">
            ㄱ님을 위한 맞춤형 코스를 분석하는 중입니다...
          </div>
        )} */}

        {generatedCourse && (
          <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
            <ReactMarkdown>{generatedCourse}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
