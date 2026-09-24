"use client";

import React, { useState } from "react";
import Image from "next/image";
import { mockReviews } from "@/data/adminData";
import { Review } from "@/types";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { Star, MessageSquare, Check, ShieldCheck, CornerDownRight } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [activeReviewForReply, setActiveReviewForReply] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState("");

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewForReply || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === activeReviewForReply.id ? { ...r, adminReply: replyText } : r
      )
    );
    setActiveReviewForReply(null);
    setReplyText("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            Reputation & Feedback
          </span>
          <h1 className="font-serif text-3xl text-white font-light">
            Critic & Patron Accolades
          </h1>
        </div>
      </div>

      {/* Rating Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131518] border border-[#23272F] p-6 rounded-sm text-center flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">
            Overall Salon Score
          </span>
          <div className="font-serif text-5xl text-white font-light my-2 flex items-center gap-2">
            <span>4.9</span>
            <span className="text-sm font-sans text-gray-500">/ 5.0</span>
          </div>
          <div className="flex items-center gap-1 text-[#D4AF37] mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">Based on 328 audited reviews</span>
        </div>

        <div className="bg-[#131518] border border-[#23272F] p-6 rounded-sm md:col-span-2 flex flex-col justify-between">
          <span className="text-xs uppercase tracking-wider text-gray-400 mb-3 block font-medium">
            Rating Distribution
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-400">5 Stars</span>
              <div className="flex-1 bg-[#1A1D23] h-2 rounded-full overflow-hidden">
                <div className="bg-[#D4AF37] h-full w-[94%]" />
              </div>
              <span className="w-8 text-right font-mono text-gray-300">94%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-400">4 Stars</span>
              <div className="flex-1 bg-[#1A1D23] h-2 rounded-full overflow-hidden">
                <div className="bg-[#D4AF37]/60 h-full w-[5%]" />
              </div>
              <span className="w-8 text-right font-mono text-gray-300">5%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-400">3 Stars</span>
              <div className="flex-1 bg-[#1A1D23] h-2 rounded-full overflow-hidden">
                <div className="bg-gray-600 h-full w-[1%]" />
              </div>
              <span className="w-8 text-right font-mono text-gray-300">1%</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 block mt-3">
            Top 1% Worldwide in Fine Dining Satisfaction Index
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl text-white font-light">
          Recent Patron Accolades
        </h3>

        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#131518] border border-[#23272F] p-6 rounded-sm space-y-4 hover:border-[#2D313A] transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/30 shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-base text-white font-medium">
                    {rev.author}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5 text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500">• {rev.date}</span>
                  </div>
                </div>
              </div>

              <Badge variant="emerald" size="sm">
                Verified Patron
              </Badge>
            </div>

            <p className="font-serif italic text-sm sm:text-base text-gray-200 font-light leading-relaxed">
              “{rev.comment}”
            </p>

            {rev.dishRecommended && (
              <div className="text-xs text-gray-400">
                <span>Recommended Course: </span>
                <span className="text-[#F3E5AB] font-medium">{rev.dishRecommended}</span>
              </div>
            )}

            {/* Existing Admin Reply if present */}
            {rev.adminReply && (
              <div className="ml-4 pl-4 border-l-2 border-[#D4AF37]/50 bg-[#16181F] p-3 rounded-sm text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-medium">
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>Executive Response:</span>
                </div>
                <p className="text-gray-300 font-light">{rev.adminReply}</p>
              </div>
            )}

            {/* Reply Action */}
            <div className="pt-2 border-t border-[#1F232B] flex justify-end">
              <button
                onClick={() => {
                  setActiveReviewForReply(rev);
                  setReplyText(rev.adminReply || "");
                }}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#D4AF37] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{rev.adminReply ? "Edit Executive Response" : "Respond as GM"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {activeReviewForReply && (
        <Modal
          isOpen={!!activeReviewForReply}
          onClose={() => setActiveReviewForReply(null)}
          title={`Respond to ${activeReviewForReply.author}`}
          subtitle="Your reply will be formally signed by the General Manager & Culinary Director."
        >
          <form onSubmit={handlePostReply} className="space-y-4 pt-2 text-xs">
            <div className="p-3 bg-[#1A1D23] rounded border border-[#2A2E35] italic text-gray-300">
              "{activeReviewForReply.comment}"
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Executive Response Text
              </label>
              <textarea
                rows={4}
                required
                placeholder="Thank you for joining our hearth..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="pt-3 border-t border-[#1F232B]">
              <Button variant="gold" size="md" type="submit" className="w-full">
                Publish Official Response
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
